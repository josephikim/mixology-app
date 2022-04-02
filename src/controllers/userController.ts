import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { rmSync } from 'fs';

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

const userController = {
  allAccess,
  userAccess,
  adminAccess,
  moderatorAccess,
  getSearchResults
};
export default userController;
