import mongoose, { ConnectOptions } from 'mongoose';
import Role from './Role';

mongoose.Promise = global.Promise;

// Connect to MongoDB
const DB_URL = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const db = mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as ConnectOptions)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
    initialRoles();
  })
  .catch((err) => {
    console.error('Connection error', err);
    process.exit();
  });

const initialRoles = (): void => {
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
