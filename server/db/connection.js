import "dotenv/config";
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.ATLAS_URI;

if (!uri) {
  throw new Error("ATLAS_URI is missing from .env file");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  await client.connect();

  await client.db("admin").command({ ping: 1 });

  console.log("Successfully connected to MongoDB!");

} catch (err) {
  console.error("MongoDB connection failed:", err);
  process.exit(1);
}

const db = client.db("employees");

export default db;