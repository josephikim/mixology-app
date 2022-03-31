import jwt from 'jsonwebtoken';
import { HydratedDocument } from 'mongoose';
import { Request, Response, NextFunction } from 'express';

import db from '../db';
import { jwtSecretKey, jwtExpiration } from '../config/authConfig';
import { IRole } from '../db/Role';

const User = db.user;
const Role = db.role;
const RefreshToken = db.refreshToken;

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
      const token = jwt.sign({ id: user.id }, jwtSecretKey, {
        expiresIn: jwtExpiration
      });

      const refreshToken = await RefreshToken.createToken(user._id);

      const authorities: string[] = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push('ROLE_' + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        userId: user._id,
        roles: authorities,
        accessToken: token,
        refreshToken: refreshToken,
        expiresIn: jwtExpiration,
        tokenType: 'jwt'
      });
    });
};

const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    // Refresh token is required
    return res.redirect('/login');
  }

  try {
    const refreshToken = await RefreshToken.findOne({ token: requestToken });

    if (!refreshToken) {
      // Refresh token not found in database
      return res.redirect('/login');
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.findByIdAndRemove(refreshToken._id, {
        useFindAndModify: false
      }).exec();

      return res.redirect('/login');
    }

    const newAccessToken = jwt.sign({ id: refreshToken.user._id }, jwtSecretKey, {
      expiresIn: jwtExpiration
    });

    return res.status(200).send({
      accessToken: newAccessToken
    });
  } catch (err) {
    return next(err);
  }
};

const authController = {
  register,
  login,
  refreshToken
};
export default authController;
