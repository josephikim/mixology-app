import express from 'express';
import { authJwt } from '../middleware';
import userController from '../controllers/userController';
import { Request, Response, NextFunction } from 'express';

const userRouter = express.Router();

userRouter.use((req: Request, res: Response, next: NextFunction): void => {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
  next();
});

// test routes
userRouter.get('/all', userController.allAccess);

userRouter.get('/user', [authJwt.verifyToken], userController.userAccess);

userRouter.get('/mod', [authJwt.verifyToken, authJwt.isModerator], userController.moderatorAccess);

userRouter.get('/admin', [authJwt.verifyToken, authJwt.isAdmin], userController.adminAccess);

// public routes
userRouter.get('/keywords', userController.getKeywords);

userRouter.get('/randomDrink', userController.getRandomDrink);

userRouter.get('/drinks', userController.getDrinks);

userRouter.get('/search/:type/:query', userController.getSearchResults);

userRouter.get('/drinkWithVideos/:idDrink', userController.getDrinkWithVideos);

// private routes
userRouter.post('/collectionItem', [authJwt.verifyToken], userController.addCollectionItem);

userRouter.post('/notes', [authJwt.verifyToken], userController.saveNotes);

userRouter.post('/deleteCollectionItem/:idDrink', [authJwt.verifyToken], userController.deleteCollectionItem);

export default userRouter;
