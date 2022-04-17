import { Request, Response, NextFunction } from 'express';
import { HydratedDocument } from 'mongoose';
import jwt from 'jsonwebtoken';

import db from '../db';
import { jwtSecretKey } from '../config/authConfig';
import { IRoleDoc } from '../db/Role';

const User = db.user;
const Role = db.role;

const { TokenExpiredError } = jwt;

interface JwtPayload {
  id: string;
}

const catchError = (err: any, res: Response): Response => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: 'Unauthorized! Access Token was expired!' });
  }

  return res.sendStatus(401).send({ message: 'Unauthorized!' });
};

const verifyToken = (req: Request, res: Response, next: NextFunction): Response | void => {
  const token = req.headers['x-access-token'] as string;

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecretKey) as JwtPayload;
    req.id = decoded.id;
    next();
  } catch (err) {
    return catchError(err, res);
  }
};

const isAdmin = (req: Request, res: Response, next: NextFunction): NextFunction | void => {
  User.findById(req.id).exec((err, user) => {
    if (err) {
      return next(err);
    }

    if (user) {
      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err: any, roles: HydratedDocument<IRoleDoc>[]) => {
          if (err) {
            return next(err);
          }

          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === 'admin') {
              next();
            }
          }

          res.status(403).send({ message: 'Require Admin Role!' });
          return;
        }
      );
    }
  });
};

const isModerator = (req: Request, res: Response, next: NextFunction): NextFunction | void => {
  User.findById(req.id).exec((err, user) => {
    if (err) {
      return next(err);
    }

    if (user) {
      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err: any, roles: HydratedDocument<IRoleDoc>[]) => {
          if (err) {
            return next(err);
          }

          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === 'moderator') {
              next();
              return;
            }
          }

          res.status(403).send({ message: 'Require Moderator Role!' });
          return;
        }
      );
    }
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
};

export default authJwt;
