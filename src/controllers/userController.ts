import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

import db from 'db';
import { IKeywordDoc } from 'db/Keyword';
import { IDrinkDoc } from 'db/Drink';
import { YoutubeVideo } from 'types';

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

const getDrink = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    Drink.findOne({ idDrink: req.params.idDrink }).exec(async (err, doc) => {
      if (err) {
        return next(err);
      }

      if (!doc) {
        const url = `${process.env.THECOCKTAILDB_API_URL}/lookup.php?i=${req.params.idDrink}`;

        const response = await axios.get(url);

        const drinksArr = response.data.drinks;

        // No content found
        if (response.status === 204 || (response.status === 200 && (!drinksArr || drinksArr[0] == undefined))) {
          res.status(204).send({ message: 'No result available.' });
        } else {
          // Save new Drink doc with videos
          const data = drinksArr[0];

          const newDrink = new Drink(data);

          const videosResult = await getVideos(data.strDrink);

          newDrink.youtubeVideos = videosResult;

          newDrink.save((err, doc) => {
            if (err) {
              return next(err);
            }
            res.status(200).send(doc);
          });
        }
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
    // Search results' data depends on search type
    // 'category', 'ingredient', glass', or 'alcohol' search will return basic fields only
    // Default search (by cocktail name) returns full drink objects
    let url = process.env.THECOCKTAILDB_API_URL as string;

    switch (type) {
      case 'category': {
        url += `/filter.php?c=${encodeURIComponent(query)}`;
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
      // Searches by cocktail name
      default: {
        url += `/search.php?s=${encodeURIComponent(query)}`;
        break;
      }
    }

    const response = await axios.get(url);

    // No content found
    if (response.status === 204 || !response.data || !response.data.drinks) {
      res.status(204).send({ message: 'No results available.' });
    } else {
      const results = response.data.drinks as IDrinkDoc[];
      res.status(200).send(results);
    }
  } catch (err) {
    return next(err);
  }
};

const addCollectionItem = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    UserCollectionItem.findOne({ user: req.body.user, idDrink: req.body.idDrink }).exec((err, doc) => {
      if (err) {
        return next(err);
      }

      if (doc == null) {
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
      } else {
        res.status(409).send({ message: 'Entry already exists in database.' });
      }
    });
  } catch (err) {
    return next(err);
  }
};

const setRating = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  UserCollectionItem.findOneAndUpdate(
    { idDrink: req.body.idDrink },
    {
      $set: { rating: req.body.rating }
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

const getDrinkWithVideos = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    Drink.findOne({ idDrink: req.params.idDrink }).exec(async (err, doc) => {
      if (err) {
        return next(err);
      }

      if (doc) {
        const videos = doc.youtubeVideos;

        const isVideosEmpty = !videos || !videos.length;

        if (isVideosEmpty) {
          const videosResult = await getVideos(doc.strDrink);

          if (!videosResult || !videosResult.length) {
            res.status(204).send({ message: 'No results available.' });
          }

          // Save videos on drink doc, then send result
          doc.youtubeVideos = videosResult;

          doc.save((err, doc) => {
            if (err) {
              return next(err);
            }

            res.status(200).send(doc);
          });
        } else {
          res.status(200).send(doc);
        }
      } else {
        res.status(500).send({ message: 'Entry not found.' });
      }
    });
  } catch (err) {
    return next(err);
  }
};

const getVideos = async (query: string) => {
  const url = `${process.env.YOUTUBE_API_URL}/search?key=${
    process.env.YOUTUBE_API_KEY
  }&type=video&part=snippet&q=${encodeURIComponent(query).replace(/%20/g, '+')}+cocktail+recipe&maxResults=5`;

  // Call Youtube API with search query
  const response = await axios.get(url);

  // Create array of YoutubeVideo objects from response
  const videosResult: YoutubeVideo[] = [];

  if (!response.data.items || response.data.items.length < 1) {
    return videosResult;
  }

  response.data.items.map((item: any) => {
    const obj = {
      id: item.id.videoId,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      description: item.snippet.description,
      publishedAt: item.snippet.publishedAt
    } as YoutubeVideo;
    videosResult.push(obj);
  });

  return videosResult;
};

const userController = {
  allAccess,
  userAccess,
  adminAccess,
  moderatorAccess,
  getDrink,
  getDrinks,
  getKeywords,
  getRandomDrink,
  getSearchResults,
  addCollectionItem,
  setRating,
  saveNotes,
  deleteCollectionItem,
  getDrinkWithVideos
};

export default userController;
