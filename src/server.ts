import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import db from './db';
import apiRouter from './routers';

const BUILD_DIR = __dirname;
const HTML_FILE = path.join(BUILD_DIR, 'index.html');

//@ts-ignore
const connection = db.connection;

const app = express();

app.use(cors());

// support data from POST requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use API routes
app.use('/api', apiRouter);

// serve static files
app.use(express.static(BUILD_DIR));

app.get('*', (req: express.Request, res: express.Response) => {
  res.sendFile(HTML_FILE);
});

// Global error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  const error = {
    name: err.name,
    message: err.message
  };

  res.status(500).send(error);
});

// start the Express server
const PORT = process.env.NODE_ENV !== 'production' ? process.env.PORT : 3000;

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
