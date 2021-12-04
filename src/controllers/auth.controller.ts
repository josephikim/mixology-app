import jwt from 'jsonwebtoken';
import db from '../db';
import config from '../config/auth.config';
import { IRole } from '../db/Role';
import { HydratedDocument } from 'mongoose';
import { Request, Response, NextFunction } from 'express';

const User = db.user;
const Role = db.role;

const register = (req: Request, res: Response, next: NextFunction): NextFunction | void => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  // If no errors, register user
  user.save((err, user) => {
    if (err) {
      return next(err);
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles: HydratedDocument<IRole>[]) => {
          if (err) {
            return next(err);
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              return next(err);
            }

            next();
          });
        }
      );
    } else {
      Role.findOne({ name: 'user' }, (err, role) => {
        if (err) {
          return next(err);
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            return next(err);
          }

          next();
        });
      });
    }
  });
};

const login = (req: Request, res: Response, next: NextFunction): NextFunction | void => {
  User.findOne({
    username: req.body.username
  })
    .populate('roles', '-__v')
    .exec(async (err, user) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return next(new Error('User not found'));
      }

      const passwordIsValid = await user.validatePassword(req.body.password);

      if (!passwordIsValid) {
        return next(new Error('Invalid password'));
      }

      // If password is valid, create JWT token
      const token = jwt.sign({ id: user.id }, config.jwtSecretKey, {
        expiresIn: config.jwtExpiration
      });

      const authorities: string[] = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push('ROLE_' + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        roles: authorities,
        accessToken: token
      });
    });
};

const authController = {
  register,
  login
};
export default authController;
