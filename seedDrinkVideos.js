import { MongoClient } from 'mongodb';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.development' });

const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DB = process.env.MONGO_DB;

const uri = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

const client = new MongoClient(uri);

const seedVideos = async () => {
  try {
    await client.connect();
    console.log('Connected correctly to server');

    const drinksCollection = client.db('mixologyapp_db').collection('drinks');

    // Find docs with empty youtubeVideos field or with a value of empty array
    let cursor = drinksCollection
      .find({ $or: [{ youtubeVideos: { $exists: false } }, { youtubeVideos: { $eq: [] } }] })
      .limit(20); // Adjust based on Youtube API usage quotas

    const docs = await cursor.toArray();

    if (docs && docs.length > 0) {
      console.log('====================');
      const ids = [];
      docs.forEach((doc) => {
        ids.push({ idDrink: doc.idDrink });
      });
      console.log(`seeding ${docs.length} documents with following ids:`);
      console.log({ ids });

      const update = await updateDocuments(drinksCollection, docs);

      console.log('====================');
      console.log('Drink videos updated successfully!');
      console.log({ update });
    } else {
      console.log('No matching documents found.');
    }

    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

const updateDocuments = async (collection, documents) => {
  const promises = [];

  // construct array of promises
  documents.forEach((doc) => {
    // check for empty document
    if (Object.keys(doc).length < 1) {
      return;
    }

    promises.push(
      new Promise(async (resolve) => {
        // Call Youtube API
        const url = `${process.env.YOUTUBE_API_URL}/search?key=${
          process.env.YOUTUBE_API_KEY
        }&type=video&part=snippet&q=${encodeURIComponent(doc.strDrink).replace(
          /%20/g,
          '+'
        )}+cocktail+recipe&maxResults=5`;

        const response = await axios.get(url);

        // check for empty response
        if (!response.data.items || response.data.items.length < 1) {
          resolve(`No results found from Youtube API for ${doc.strDrink}`);
        }

        // Create array of video objects from API response
        const videos = [];

        response.data.items.map((item) => {
          const obj = {
            id: item.id.videoId,
            title: item.snippet.title,
            channelTitle: item.snippet.channelTitle,
            description: item.snippet.description,
            publishedAt: item.snippet.publishedAt
          };
          videos.push(obj);
        });

        // update document
        collection.updateOne({ idDrink: doc.idDrink }, { $set: { youtubeVideos: videos } }).then((result) => {
          resolve(result);
        });
      })
    );
  });

  const result = await Promise.all(promises);
  return result;
};

seedVideos();
