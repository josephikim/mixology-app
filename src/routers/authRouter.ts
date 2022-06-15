import express, { Request, Response, NextFunction } from 'express';

import { verifyRegistration } from 'middleware';
import authController from 'controllers/authController';

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
authRouter.post('/refreshtoken', authController.refreshToken);

export default authRouter;
