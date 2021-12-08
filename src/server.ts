import path from 'path';
import express from 'express';
import db from './db';
import cors from 'cors';
import apiRouter from './routers';

const BUILD_DIR = __dirname;
const HTML_FILE = path.join(BUILD_DIR, 'index.html');

const connection = db.connection;

const app = express();

app.use(cors());

// support data from POST requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// serve static files
app.use(express.static(BUILD_DIR));

// Use API routes
app.use('/api', apiRouter);

app.get('*', (_req: express.Request, res: express.Response) => {
  res.sendFile(HTML_FILE);
});

// start the Express server
const PORT = process.env.NODE_ENV !== 'production' ? process.env.PORT : 3000;

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
