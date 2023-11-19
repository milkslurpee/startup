const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('piratesDB');
const scoreCollection = db.collection('points');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await client.connect();
    await db.command({ ping: 1 });
    console.log('Connected to MongoDB');
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

async function awardPoints(points) {
  const result = await scoreCollection.insertOne(points);
  return result;
}

function getLeaderboard() {
  const query = { points: { $gt: 0 } }; // Adjust query based on your schema
  const options = {
    sort: { points: -1 }, // Sort based on points field
    limit: 10,
  };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}

module.exports = { awardPoints, getLeaderboard };
