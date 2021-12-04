import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import db from '../db';
import config from '../config/auth.config';

const { TokenExpiredError } = jwt;

const User = db.user;
const Role = db.role;

const catchError = (err, res): Response => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: 'Unauthorized! Access Token was expired!' });
  }

  return res.sendStatus(401).send({ message: 'Unauthorized!' });
};

const verifyToken = (req: Request, res: Response, next: NextFunction): Response | void => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, config.jwtSecretKey, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.id = decoded.id;
    next();
  });
};

const isAdmin = (req: Request, res: Response, next: NextFunction): NextFunction | void => {
  User.findById(req.id).exec((err, user) => {
    if (err) {
      return next(err);
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
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
  });
};

const isModerator = (req: Request, res: Response, next: NextFunction): NextFunction | void => {
  User.findById(req.id).exec((err, user) => {
    if (err) {
      return next(err);
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
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
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
};

export default authJwt;
