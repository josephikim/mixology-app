import { Request, Response, NextFunction } from 'express';
import db from 'db';

const Roles = db.roles;
const User = db.user;

const checkDuplicateUsername = (req: Request, res: Response, next: NextFunction): Response | NextFunction | void => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      return next(err);
    }
    if (user) {
      return res.status(409).send({
        type: 'username',
        message: 'Username is already in use'
      });
    }
    next();
  });
};

const checkRolesExist = (req: Request, res: Response, next: NextFunction): Response | void => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!Roles.includes(req.body.roles[i])) {
        return res.status(404).send({
          type: 'role',
          message: `Role ${req.body.roles[i]} does not exist!`
        });
      }
    }
  }
  next();
};

const verifyRegistration = {
  checkDuplicateUsername,
  checkRolesExist
};

export default verifyRegistration;
