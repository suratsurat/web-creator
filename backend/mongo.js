const { MongoClient } = require('mongodb');
require('dotenv').config();

let db;

async function connectDB() {
  if (db) return db;

  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  db = client.db('web_creator'); // use your DB name
  return db;
}

module.exports = connectDB;
