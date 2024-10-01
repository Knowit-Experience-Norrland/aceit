import { MONGO_URL, DATABASE_NAME } from '$env/static/private';
import { MongoClient } from 'mongodb';

const client = new MongoClient(MONGO_URL);

export const connect = async (): Promise<void> => {
  await client.connect();
}

export const disconnect = async (): Promise<void> => {
  await client.close();
}

export const getDB = () => {
  return client.db(DATABASE_NAME);
}
