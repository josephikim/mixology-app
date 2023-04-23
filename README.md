# Mixology App

<img src="src/assets/images/drinkpage.png" width="640"  />

## Description

**Mixology App** helps you curate your favorite drinks, research recipes, submit ratings, compose tasting notes and more. The app has architectural elements in place (e.g. Mongoose, Redux-Toolkit, React-Router, JSON Web Token) to help developers scale up its functionality easily. It uses third party data provided by [TheCocktailDB API](https://www.thecocktaildb.com/api.php) and the [Youtube Data API](https://developers.google.com/youtube/v3).

Feel free to use or modify the codebase for your own project!

This demo utilizes the "MERN stack" which makes it possible to quickly build and easily maintain a full-stack web app, and consists of the following technologies:

- **MongoDB**: A document-based open source database.
- **Express**: A web application framework for Node.js.
- **React**: A JavaScript front-end library for building user interfaces.
- **Node.js**: JavaScript run-time environment that executes JavaScript code outside of a browser (such as a server).

## File structure

- `src`
  - `api` - This folder holds files used by the API client
  - `assets` - This folder holds assets such as images
  - `components` - This folder holds different components that will make up our views
  - `config` - This folder holds app configuration files
  - `controllers` - This folder holds controller functions used by Express.js
  - `db` - This folder holds database models and connection files
  - `hooks` - This folder holds React hooks for use in functional components
  - `layout` - This folder holds components used for page layout
  - `middleware` - This folder holds middleware used by Express.js
  - `pages` - This folder holds components organized by page level view
  - `routers` - This folder holds routers used by Express.js
  - `store` - This folder holds files used to connect to the Redux store and call actions
  - `styles` - This folder holds stylesheets used by the frontend
  - `utils` - This folder holds utility functions
  - `App.tsx` - Renders all of our browser routes and different views
  - `custom.d.ts` - Custom type declarations for third party packages
  - `index.html` - Our index.html file
  - `index.tsx` - Entrypoint for React app
  - `server.ts` - Entrypoint for Node.js app
  - `types.ts` - Custom type declarations
  - `validation.ts` - Used for form validation
- `.babelrc` - Configuration file for Babel.js
- `.env.sample` - Sample file containing environment variables used by dotenv.js
- `.gitignore` - Directories to exclude from git tracking
- `.prettierrc.cjs` - Configuration file for Prettier.js
- `package.json` - Defines npm behaviors and packages
- `package-lock.json` - Tracks dependency tree
- `seedDrinks.js` - Script for seeding drink documents in MongoDB
- `seedDrinkVideos.js` - Script for seeding drink documents' video data in MongoDB
- `tsconfig.json` - Configuration file for TypeScript
- `webpack.common.js` - Webpack configuration file for common settings
- `webpack.development.js` - Webpack configuration file for development mode settings
- `webpack.production.js` - Webpack configuration file for production mode settings
- `README.md` - This file!

## Initial Setup

Mixology App was built using Node version 16. Please install a long-term support (LTS) version for best compatibility with other libraries.

- Node.js <https://nodejs.org/en/download/>

To verify that you have Node.js installed on your system, type the following command in your command line terminal (Terminal for Mac/Linux, CMD for Windows).

```console
node -v
```

### Environment Variables

Before you build or run the app, create two new files called `.env.development` and `.env.production` at the project root. These are configuration files that will be used by dotenv.js to expose environment variables to your app at runtime.

In each file, you need to enter values for the following environment variables (refer to `.env.sample` for example values):

`PORT`: Port where the app will run

`MONGO_HOST`: Name of the Mongo host (e.g. `localhost` in development mode)

`MONGO_PORT`: Mongo port (e.g. `27017`)

`MONGO_DB`: Name of the Mongo database used

`MONGO_PASS`: Mongo password (optional)

`API_URL`: Base URL for API calls to the Node app (e.g. `http://localhost:3000/api` in development mode)

`THECOCKTAILDB_API_URL`: Base URL for The CocktailDB API

`YOUTUBE_API_URL`: Base URL for Youtube Data API

`YOUTUBE_API_KEY`: Key used for Youtube Data API calls. You need to create a free Google Developers account in order to generate this key.

`JWT_SECRET_KEY`: Private key used by JSON Web Token (JWT)

`JWT_EXPIRATION`: JWT token expiration (in seconds)

`JWT_REFRESH_EXPIRATION`: JWT refresh token expiration (in seconds)

### MongoDB

Mixology App works best with a local installation of MongoDB (v4.4.6), but can be used with MongoDB instances located elsewhere.

First set up a local installation of Mongo using instructions corresponding to your operating system.

- MongoDB <https://www.mongodb.com/try/download>

Once those steps have been completed, and your MongoDB instance is up and running (typically using the command `mongod`), you need to create a new database to store Mixology App data. This can be done in several ways, but most commonly with the Mongo shell CLI which comes pre-installed with MongoDB. You can start the Mongo shell from the command line using the `mongo` command, then create a new Mongo database (e.g. `mixologyapp_db`).

Now verify that the app can connect to your new database by starting the app in development mode.

**NOTE**: Make sure you've created an `.env.development` and `.env.production` file at the project root with the required environment variables before starting the app! See _Environment Variables_ above.

- First install application dependencies using `npm install`. Once that is complete, start the app in development mode with `npm run dev`.

Once the workflow is complete, the following messages will appear in the terminal:

```text
  Successfully connected to MongoDB
  added "user" to roles collection
  added "moderator" to roles collection
  added "admin" to roles collection
```

Verify the newly created documents in the `roles` collection by inspecting your database using the Mongo shell CLI or another database management tool (e.g. Robot 3T).

### Initialize Data

Next you need to seed your database using the scripts `seedDrinks.js` and `seedDrinkVideos.js`. Make sure to run these scripts in order (First `seedDrinks.js` then `seedDrinkVideos.js`).

- Seed drink documents by running `node seedDrinks.js`

This script connects to your Mongo database, makes API calls to The CocktailDB for drink data, and updates the `drinks` collection in the database. Once the workflow is complete, the following messages will appear in the terminal:

```text
  Connected correctly to server
  Database seeded!
```

- Seed drink videos data by running `node seedDrinkVideos.js`

This script connects to your Mongo instance, makes API calls to the Youtube Data API for video data corresponding to documents in your `drinks` collection, and updates those documents with the returned API data. If the script runs successfully, you should see a success message in the terminal.

```text
  Drink videos updated successfully!
```

Now you can verify the new documents in the `drinks` collection of your database.

**Note**: Depending on your access policy, the Youtube Data API may limit the number and frequency of calls it will accept from a given client. You can set or remove this limit by updating the line `.limit(20)` in `seedDrinkVideos.js`. Depending on the result, you may need to run the script multiple times in order to seed every drink in your database.

## Run the app

To run the app in **development mode**, run the command `npm run dev`. This triggers a Webpack workflow which lints the source code, applies formatting changes based on Prettier.js settings, builds the `server.cjs` file, and serves up the frontend via in-memory assets using Webpack Dev Server. Once the workflow is complete, you should be able to see the server running in the terminal. If started correctly, the following message will appear in the terminal, `Server started at http://localhost:3001`. Then try visiting `http://localhost:8080` in your browser to access the frontend.

**Note**: Hot module reloading is turned on by default in development mode. To turn HMR off, remove `hot: true` from the `client` config in `webpack.development.js`.

To build a production-ready bundle of the app, run the command `npm run build`.

This triggers a webpack workflow which bundles the source code and static assets using Webpack and emits the results into the `build` folder. Once you've verified the bundled files have been created, run `npm run pm2` to start the app as a background process using the process management tool PM2. You can use any process manager of your choice, but PM2 generally works well with Node environments.

## Authentication

Mixology App uses JSON Web Token (JWT) for managing authentication. JWT is a popular choice for authentication in Node.js apps for several reasons:

- Fewer database queries
- Less development time
- Easier to scale up with userbase
- Better portability across services

Since the backend of the app acts as both issuer and verifier of JWT tokens, it only needs one private key for authentication purposes. This is the key designated as `JWT_SECRET_KEY` in your `.env.*` files.

**Important**: Never share sensitive information such as keys or passwords! Make sure to apply appropriate security settings to prevent exposing your files.

### Authorization

Each user document in your database includes a `roles` field which can take on one of three values: `user`, `moderator` or `admin`. These values aren't currently used for authorization purposes, but can be used to build out an authorization layer on top of the authentication workflow if desired.

## React and Redux

The frontend is a single-page React app that supports client-side routing via React-Router. This enables fast navigation between views and reduces the amount of network calls initiated by the frontend.

**Note**: To support single-page apps in production, you may need to update the configuration of the web server used to serve your app (e.g Nginx).

Client data is stored using Redux which promotes data consistency, reduces database calls, and allows the use of Redux Devtools for development.

Redux data is also persisted to your browser's `localStorage` (in the object located at `localStorage.state`) for access between browser sessions. If at any point the app displays data which appears out of sync, try clearing your browser's localStorage and reloading the page.
