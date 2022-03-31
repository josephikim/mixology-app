import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

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
    const url = `${process.env.SEARCH_API_URL}?s=${req.params.query}`;
    const response = await axios.get(url);
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
