import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

import db from '../db';
import { IKeywordDoc } from '../db/Keyword';
import { IDrinkDoc } from 'src/db/Drink';

const Drink = db.drink;
const Keyword = db.keyword;
const UserCollectionItem = db.userCollectionItem;

const allAccess = (req: Request, res: Response): void => {
  res.status(200).send('Public Content.');
};

const userAccess = (req: Request, res: Response): void => {
  res.status(200).send('User Content.');
};

const adminAccess = (req: Request, res: Response): void => {
  res.status(200).send('Admin Content.');
};

const moderatorAccess = (req: Request, res: Response): void => {
  res.status(200).send('Moderator Content.');
};

const getKeywords = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    Keyword.find().exec(async (err, docs) => {
      if (err) {
        return next(err);
      }

      if (docs == null || docs.length == 0) {
        try {
          const response = (await Promise.all([
            getKeywordsByType('category'),
            getKeywordsByType('ingredient'),
            getKeywordsByType('glass'),
            getKeywordsByType('alcohol')
          ])) as IKeywordDoc[][];

          const responseFlattened: IKeywordDoc[] = [];

          response.map((arr) => {
            arr.forEach((element) => {
              responseFlattened.push(element);
            });
          });

          await Keyword.insertMany(responseFlattened);

          Keyword.find(
            { type: { $in: ['category', 'ingredient', 'glass', 'alcohol'] } },
            ['type', 'value', '-_id'],
            function (err, docs) {
              if (err) {
                return next(err);
              } else {
                res.status(200).send(docs);
              }
            }
          );
        } catch (err) {
          return next(err);
        }
      } else {
        res.status(200).send(docs);
      }
    });
  } catch (err) {
    return next(err);
  }
};

const getRandomDrink = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    // Search cocktail API for random drink
    const url = `${process.env.THECOCKTAILDB_API_URL}/random.php`;

    const response = await axios.get(url);

    if (response.status === 204 || (!response.data.drinks && response.status === 200)) {
      res.status(204).send({ message: 'No results available.' });
    }

    const idDrink = response.data.drinks[0].idDrink as string;

    // Search Drink collection for matching drink
    Drink.findOne({ idDrink: idDrink }).exec(async (err, doc) => {
      if (err) {
        return next(err);
      }

      if (!doc) {
        // If matching drink not found, search cocktail API by idDrink, then save result as new Drink doc
        const url = `${process.env.THECOCKTAILDB_API_URL}/lookup.php?i=${idDrink}`;

        const response = await axios.get(url);

        // No content found
        if (response.status === 204 || (!response.data.drinks && response.status === 200)) {
          res.status(204).send({ message: 'No results available.' });
        }

        const newDrink = new Drink(response.data.drinks[0]);

        newDrink.save((err, doc) => {
          if (err) {
            return next(err);
          }

          res.status(200).send(doc);
        });
      } else {
        res.status(200).send(doc);
      }
    });
  } catch (err) {
    return next(err);
  }
};

const getDrinks = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    Drink.find().exec(async (err, docs) => {
      if (err) {
        return next(err);
      }

      if (!docs) {
        return next(new Error('Drinks not found'));
      }

      res.status(200).send(docs);
    });
  } catch (err) {
    return next(err);
  }
};

const getSearchResults = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { type, query } = req.params;

  try {
    // Search cocktail API by search type and query
    let url = process.env.THECOCKTAILDB_API_URL as string;

    switch (type) {
      case 'category': {
        url += `/filter.php?c=${query}`;
        break;
      }
      case 'ingredient': {
        url += `/filter.php?i=${encodeURIComponent(query)}`;
        break;
      }
      case 'glass': {
        url += `/filter.php?g=${encodeURIComponent(query)}`;
        break;
      }
      case 'alcohol': {
        url += `/filter.php?a=${encodeURIComponent(query)}`;
        break;
      }
      case 'drink':
      default: {
        url += `/search.php?s=${encodeURIComponent(query)}`;
        break;
      }
    }

    const response = await axios.get(url);

    // No content found
    if (response.status === 204) {
      res.status(204).send({ message: 'No results available.' });
    }

    const results = response.data.drinks as IDrinkDoc[];

    // Create array of drink ids from results
    const ids = results.map((result) => {
      return result.idDrink as string;
    });

    // Resolve array of promises where each id triggers a search for matching Drink doc. If doc not found, get drink info via cocktail API search and save result as new Drink doc.
    const promises = [] as any;

    for (let index = 0; index < ids.length; index++) {
      promises.push(
        new Promise((resolve) => {
          Drink.findOne({ idDrink: ids[index] }).exec(async (err, doc) => {
            if (err) {
              return next(err);
            }

            if (!doc) {
              // Search cocktail API by drink ID
              const url = `${process.env.THECOCKTAILDB_API_URL}/lookup.php?i=${ids[index]}`;

              const response = await axios.get(url);

              // No content found
              if (response.status === 204 || response.data.drinks == null) return;

              const result = response.data.drinks[0];

              // save result as new Drink
              const newDrink = new Drink(result);

              newDrink.save((err, doc) => {
                if (err) {
                  return next(err);
                }

                resolve(doc);
              });
            } else {
              resolve(doc);
            }
          });
        })
      );
    }

    Promise.all(promises).then((results) => {
      res.status(200).send(results);
    });
  } catch (err) {
    return next(err);
  }
};

const addCollectionItem = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  UserCollectionItem.findOne({ user: req.body.user, idDrink: req.body.idDrink }).exec((err, doc) => {
    if (err) {
      return next(err);
    }

    if (doc == null) {
      try {
        const data = {
          ...req.body
        };

        const newItem = new UserCollectionItem(data);

        newItem.save((err, doc) => {
          if (err) {
            return next(err);
          }

          res.status(200).send(doc);
        });
      } catch (err) {
        return next(err);
      }
    } else {
      res.status(409).send({ message: 'Entry already exists in database.' });
    }
  });
};

const saveNotes = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  UserCollectionItem.findOneAndUpdate(
    { idDrink: req.body.idDrink },
    {
      $set: { notes: req.body.notes }
    },
    {
      new: true
    }
  ).exec((err, doc) => {
    if (err) {
      return next(err);
    }

    if (!doc) {
      return next(new Error('Collection item not found!'));
    }

    res.status(200).send(doc);
  });
};

const deleteCollectionItem = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  UserCollectionItem.findOneAndDelete({ idDrink: req.params.idDrink }).exec((err, doc) => {
    if (err) {
      return next(err);
    } else {
      res.status(200).send(doc);
    }
  });
};

// Not an express middleware
const getKeywordsByType = async (type: string): Promise<IKeywordDoc[] | void> => {
  if (!type) return;

  let url = `${process.env.THECOCKTAILDB_API_URL}/list.php?`;

  switch (type) {
    case 'category': {
      url += 'c=list';
      break;
    }
    case 'ingredient': {
      url += 'i=list';
      break;
    }

    case 'glass': {
      url += 'g=list';
      break;
    }
    case 'alcohol': {
      url += 'a=list';
      break;
    }
  }

  try {
    const response = await axios.get(url);

    // No content found
    if (response.status === 204 || (!response.data.drinks && response.status === 200)) {
      return [];
    }

    const results = response.data.drinks;

    let dataField = '';

    switch (type) {
      case 'category': {
        dataField = dataField + 'strCategory';
        break;
      }
      case 'ingredient': {
        dataField = dataField + 'strIngredient1';
        break;
      }

      case 'glass': {
        dataField = dataField + 'strGlass';
        break;
      }
      case 'alcohol': {
        dataField = dataField + 'strAlcoholic';
        break;
      }
    }

    const keywords = results.map((result: any) => {
      return {
        type: type,
        value: result[dataField]
      };
    });
    return keywords;
  } catch (err) {
    return Promise.reject(err);
  }
};

const userController = {
  allAccess,
  userAccess,
  adminAccess,
  moderatorAccess,
  getDrinks,
  getKeywords,
  getRandomDrink,
  getSearchResults,
  addCollectionItem,
  saveNotes,
  deleteCollectionItem
};

export default userController;
