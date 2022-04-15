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

// user routes
userRouter.get('/search/:query', [authJwt.verifyToken], userController.getSearchResults);

userRouter.post('/addDrink', [authJwt.verifyToken], userController.addDrink);

userRouter.post('/saveNotes', [authJwt.verifyToken], userController.saveNotes);

export default userRouter;
