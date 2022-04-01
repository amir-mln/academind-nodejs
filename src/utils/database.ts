import { MongoClient, Db } from "mongodb";

const dbName = "academind-nodejs";
const url = "mongodb://localhost:27017";

const client = new MongoClient(url);
let db: Db;

async function connectToMongo() {
  try {
    await client.connect();
    db = client.db(dbName);
  } catch {
    client.close();
    console.error("Couldn't connect to database");
  }
}

function getDatabase() {
  if (!db) console.error("you need to connect to the database first!");
  else return db;
}

export { connectToMongo, getDatabase };
