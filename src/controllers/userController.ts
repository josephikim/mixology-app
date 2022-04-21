import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

import db from '../db';
import { IDrinkDoc } from '../db/Drink';
import { IGetVideosResult } from '../types';

const Drink = db.drink;

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

const getSearchResults = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    // Search by drink name
    const url = `${process.env.SEARCH_API_URL}?s=${req.params.query}`;
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
  Drink.findOne({ idDrinkApi: req.body.idDrinkApi }).exec((err, drink) => {
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
      )}+recipe&maxResults=6`;

      // Call Youtube API with search query
      const response = await axios.get(url);

      if (!response.data.items || response.data.items.length < 1) {
        res.status(204).send({ message: 'No results available.' });
      }

      // Create array of video IDs from response
      const youtubeIds: string[] = [];

      response.data.items.map((item: any) => {
        const videoId = item.id.videoId;
        youtubeIds.push(videoId);
      });

      // Save youtubeIds on drink doc, then send IGetVideosResult response
      drink.youtubeIds = youtubeIds;

      drink.save((err, doc) => {
        if (err) {
          return next(err);
        }

        const result = {
          drinkId: doc._id,
          youtubeIds: doc.youtubeIds
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
  getSearchResults,
  addDrink,
  saveNotes,
  deleteDrink,
  getVideos
};

export default userController;
