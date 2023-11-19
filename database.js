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

async function addUser(username, password, userId) {
    try {
      await db.collection('users').insertOne({ username, password, userId, points: 0, redeemedCodes: [] });
    } catch (error) {
      console.error('Error adding user:', error);
      throw new Error('Error adding user to the database');
    }
  }
  
  async function findUserByUsername(username) {
    try {
      return await db.collection('users').findOne({ username });
    } catch (error) {
      console.error('Error finding user by username:', error);
      throw new Error('Error finding user by username');
    }
  }
  
  async function findUserById(userId) {
    try {
      return await db.collection('users').findOne({ userId });
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw new Error('Error finding user by ID');
    }
  }

  async function updateUserPoints(userId, newPoints) {
    try {
      await db.collection('users').updateOne({ userId }, { $set: { points: newPoints } });
    } catch (error) {
      console.error('Error updating user points:', error);
      throw new Error('Error updating user points');
    }
  }
  
  async function getLeaderboard() {
    try {
      return await db.collection('users').find().sort({ points: -1 }).limit(10).toArray();
    } catch (error) {
      console.error('Error getting leaderboard:', error);
      throw new Error('Error getting leaderboard');
    }
  }
  
  async function addRedeemedCode(userId, code) {
    try {
      await db.collection('users').updateOne({ userId }, { $push: { redeemedCodes: code } });
    } catch (error) {
      console.error('Error adding redeemed code:', error);
      throw new Error('Error adding redeemed code');
    }
  }

module.exports = {
    connect,
    addUser,
    findUserByUsername,
    findUserById,
    updateUserPoints,
    getLeaderboard,
    addRedeemedCode,
  };