import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import configs from '../../webpack.development.js';

const BUILD_DIR = path.join(process.cwd(), 'dist');
const HTML_FILE = path.join(BUILD_DIR, 'index.html');

const app = express();

// webpack dev middleware
// characters.filter(character => character.team === 'Avengers');
const clientConfig = configs.filter((config) => config.name === 'client')[0];
console.log('clientConfig', clientConfig);
console.log('clientConfig.output', clientConfig.output);

const compiler = webpack(clientConfig);

app.use(
  // @ts-ignore
  webpackDevMiddleware(compiler, {
    logLevel: 'warn'
    // publicPath: clientConfig.output.publicPath
  })
);

app.use(
  webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  })
);

// support data from POST requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// serve static files
app.use(express.static(BUILD_DIR));

app.get('*', (_req: express.Request, res: express.Response) => {
  res.sendFile(HTML_FILE);
});

// start the Express server
const PORT = process.env.NODE_ENV !== 'production' ? process.env.PORT : 3000;

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
