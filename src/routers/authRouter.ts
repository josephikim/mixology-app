import express from 'express';
import { authJwt, verifyRegistration } from '../middleware';
import authController from '../controllers/authController';
import { Request, Response, NextFunction } from 'express';

const authRouter = express.Router();

authRouter.use((req: Request, res: Response, next: NextFunction): void => {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
  next();
});

// POST request to register user
authRouter.post(
  '/register',
  [verifyRegistration.checkDuplicateUsername, verifyRegistration.checkRolesExist],
  [authController.register, authController.login]
);

// POST request to login user
authRouter.post('/login', authController.login);

// POST request to refresh access token
authRouter.post('refreshtoken', [authJwt.verifyToken], authController.refreshToken);

export default authRouter;
