import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

import db from '../db';
import { IDrinkDoc } from '../db/Drink';
import { IKeywordDoc } from '../db/Keyword';
import { YoutubeVideo, IGetVideosResult } from '../types';

const Drink = db.drink;
const Keyword = db.keyword;

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
            function (err: any, docs: IDrinkDoc[]) {
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

const getKeywordsByType = async (type: string): Promise<IKeywordDoc[] | void> => {
  if (!type) return;

  let url = `${process.env.THECOCKTAILDB_API_URL}list.php?`;

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
      } as IKeywordDoc;
    });
    return keywords;
  } catch (err) {
    return Promise.reject(err);
  }
};

const getRandomDrink = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    // Search random drink
    const url = `${process.env.THECOCKTAILDB_API_URL}random.php`;

    const response = await axios.get(url);

    // No content found
    if (response.status === 204 || (!response.data.drinks && response.status === 200)) {
      res.status(204).send({ message: 'No results available.' });
    }

    const result = response.data.drinks[0];

    res.status(200).send(result);
  } catch (err) {
    return next(err);
  }
};

const getSearchResults = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    // Search by drink name
    const url = `${process.env.THECOCKTAILDB_API_URL}search.php?s=${req.params.query}`;
    const response = await axios.get(url);

    // No content found
    if (response.status === 204 || (!response.data.drinks && response.status === 200)) {
      res.status(204).send({ message: 'No results available.' });
    }

    const results = response.data.drinks;

    res.status(200).send(results);
  } catch (err) {
    return next(err);
  }
};

const addDrink = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  Drink.findOne({ user: req.body.user, idDrinkApi: req.body.idDrinkApi }).exec((err, drink) => {
    if (err) {
      return next(err);
    }

    if (drink == null) {
      try {
        const data = {
          ...req.body
        };

        if (req.body.strTags?.length > 0) {
          const strTagsSplit = req.body.strTags.split(',');
          data['strTags'] = strTagsSplit;
        }

        const newDrink = new Drink(data);

        newDrink.save((err, doc) => {
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
  Drink.findOneAndUpdate(
    { _id: req.body.idDrink },
    {
      $set: { notes: req.body.notes }
    },
    {
      new: true
    }
  ).exec((err, drink) => {
    if (err) {
      return next(err);
    }

    if (!drink) {
      return next(new Error('Drink not found'));
    }

    res.status(200).send(drink);
  });
};

const deleteDrink = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const id = req.params.drinkId;

  Drink.findOneAndDelete({ _id: id }, function (err: any, doc: IDrinkDoc) {
    if (err) {
      return next(err);
    } else {
      res.status(200).send(doc);
    }
  });
};

const getVideos = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const drink = (await Drink.findById(req.params.drinkId)) as IDrinkDoc;

    if (drink) {
      const url = `${process.env.YOUTUBE_API_URL}/search?key=${
        process.env.YOUTUBE_API_KEY
      }&type=video&part=snippet&q=${encodeURIComponent(drink.strDrink as string).replace(
        /%20/g,
        '+'
      )}+recipe&maxResults=5`;

      // Call Youtube API with search query
      const response = await axios.get(url);

      if (!response.data.items || response.data.items.length < 1) {
        res.status(204).send({ message: 'No results available.' });
      }

      // Create array of objects from youtube response
      const videos: YoutubeVideo[] = [];

      response.data.items.map((item: any) => {
        const obj = {
          id: item.id.videoId,
          title: item.snippet.title,
          channelTitle: item.snippet.channelTitle,
          description: item.snippet.description,
          publishedAt: item.snippet.publishedAt
        } as YoutubeVideo;
        videos.push(obj);
      });

      // Save videos on drink doc, then send response
      drink.youtubeVideos = videos;

      drink.save((err, doc) => {
        if (err) {
          return next(err);
        }

        const result = {
          drinkId: doc._id,
          videos: doc.youtubeVideos
        } as IGetVideosResult;

        res.status(200).send(result);
      });
    } else {
      res.status(500).send({ message: 'Entry not found.' });
    }
  } catch (err) {
    return next(err);
  }
};

const userController = {
  allAccess,
  userAccess,
  adminAccess,
  moderatorAccess,
  getKeywords,
  getRandomDrink,
  getSearchResults,
  addDrink,
  saveNotes,
  deleteDrink,
  getVideos
};

export default userController;
