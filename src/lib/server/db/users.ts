import { ObjectId } from 'mongodb';
import { getDB } from './mongo';

const db = getDB();
const collection = db.collection('users');

export const getUser = async (id: string) => {
  const options = {
    projection: { password: 0, _id: 0 } // NOTE: if we need _id in the application we must remove it from the projection and convert it to a string
  }

  return await collection.findOne({ _id: new ObjectId(id) }, options) as App.User | null;
}

export const getUserDocumentByEmail = async (email: string) => {
  return await collection.findOne({ email });
}

export const insertUser = async (user: any) => {
  return await collection.insertOne(user);
}

export const userExists = async (email: string) => {
  const count = await collection.countDocuments({ email });

  return count > 0;
}
