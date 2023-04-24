import { MongoClient } from 'mongodb';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.development' });

const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DB = process.env.MONGO_DB;

const uri = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

const client = new MongoClient(uri);

const searchDrinksByFirstLetter = async (letter) => {
  const url = `${process.env.THECOCKTAILDB_API_URL}/search.php?f=${letter}`;
  const response = await axios.get(url);

  // No content found
  if (response.status === 204 || (!response.data.drinks && response.status === 200)) {
    return [];
  }

  let results = response.data.drinks;

  return results;
};

// make a bunch of drinks
const makeDrinks = async () => {
  let drinks = [];

  // For each letter in the alphabet, search drink api by drink's first letter
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x).toLowerCase());

  for (const letter of alphabet) {
    const results = await searchDrinksByFirstLetter(letter);

    drinks = drinks.concat(results);
  }

  return drinks;
};

const seedDB = async () => {
  try {
    await client.connect();
    console.log('Connected correctly to server');

    const drinksCollection = client.db('mixologyapp_db').collection('drinks');

    const drinksData = await makeDrinks();
    const ops = [];

    // Insert drink into DB if no existing document with matching idDrink is found
    drinksData.forEach((drink) => {
      ops.push({ updateOne: { filter: { idDrink: drink.idDrink }, update: { $setOnInsert: drink }, upsert: true } });
    });

    // run bulkWrite operation
    if (ops.length > 0) {
      drinksCollection.bulkWrite(ops).then((result) => {
        console.log('Database seeded!');
        console.log({ result });
        client.close();
      });
    }
  } catch (err) {
    console.log(err.stack);
  }
};

seedDB();
