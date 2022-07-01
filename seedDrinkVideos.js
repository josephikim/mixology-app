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

    // The drop() command destroys all data from a collection.
    // Make sure you run it against proper database and collection.
    // collection.drop();

    // Return all docs with idDrink
    // let cursor = drinksCollection.find({ idDrink: { $exists: true, $ne: null } });

    // Return all docs without an actual entry in youtubeVideos
    let cursor = drinksCollection
      .find({
        'youtubeVideos.0': { $exists: false }
      })
      .limit(20); // Adjust based on Youtube API usage quotas

    cursor.count({}, function (err, count) {
      console.log('====================');
      console.log(count);
    });

    let promises = [];

    cursor.forEach(function (doc) {
      if (!doc || Object.keys(doc).length < 1) {
        return;
      } else {
        const videos = doc.youtubeVideos;
        const isVideosEmpty = !videos || !videos.length;

        if (isVideosEmpty) {
          promises.push(
            new Promise(async (resolve) => {
              const url = `${process.env.YOUTUBE_API_URL}/search?key=${
                process.env.YOUTUBE_API_KEY
              }&type=video&part=snippet&q=${encodeURIComponent(doc.strDrink).replace(
                /%20/g,
                '+'
              )}+cocktail+recipe&maxResults=5`;

              // Call Youtube API with search query
              const response = await axios.get(url);

              if (!response.data.items || response.data.items.length < 1) {
                resolve('No results found from Youtube API');
              }

              // Create array of YoutubeVideo objects from response
              const videosResult = [];

              response.data.items.map((item) => {
                const obj = {
                  id: item.id.videoId,
                  title: item.snippet.title,
                  channelTitle: item.snippet.channelTitle,
                  description: item.snippet.description,
                  publishedAt: item.snippet.publishedAt
                };
                videosResult.push(obj);
              });

              drinksCollection
                .updateOne({ idDrink: doc.idDrink }, { $set: { youtubeVideos: videosResult } })
                .then((updated) => {
                  resolve(updated);
                });
            })
          );
        }
      }
    });

    Promise.all(promises).then((results) => {
      console.log('Drink videos updated successfully!');
    });
  } catch (err) {
    console.log(err.stack);
  }
};

seedVideos();
