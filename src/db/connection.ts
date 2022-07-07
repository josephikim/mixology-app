import mongoose from 'mongoose';
import Role from './Role';

mongoose.Promise = global.Promise;

// Connect to MongoDB
const MONGO_URL = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;

const db = mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('Successfully connected to MongoDB');
    initRoles();
  })
  .catch((err) => {
    console.error('Connection error', err);
    process.exit();
  });

const initRoles = (): void => {
  Role.estimatedDocumentCount((err: any, count: number) => {
    if (!err && count === 0) {
      new Role({
        name: 'user'
      }).save((err) => {
        if (err) {
          console.log('error', err);
        }

        console.log('added "user" to roles collection');
      });

      new Role({
        name: 'moderator'
      }).save((err) => {
        if (err) {
          console.log('error', err);
        }

        console.log('added "moderator" to roles collection');
      });

      new Role({
        name: 'admin'
      }).save((err) => {
        if (err) {
          console.log('error', err);
        }

        console.log('added "admin" to roles collection');
      });
    }
  });
};

export default db;
