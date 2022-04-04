import { MongoClient, Db } from "mongodb";

const dbName = "academind-nodejs";
const url = "mongodb://localhost:27017";

const client = new MongoClient(url);
let db: Db;

async function connectToMongo() {
  try {
    await client.connect();
  } catch {
    client.close();
    console.error("Couldn't connect to database");
  }
}

function getDatabase() {
  if (!db) db = client.db(dbName);
  return db;
}

export { connectToMongo, getDatabase };
