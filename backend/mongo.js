const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URI);
const dbName = 'websites';

async function connectDB() {
  if (!client.topology?.isConnected()) await client.connect();
  return client.db(dbName);
}

module.exports = connectDB;
