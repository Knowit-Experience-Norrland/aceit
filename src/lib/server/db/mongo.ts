import { MONGO_URL, DATABASE_NAME } from '$env/static/private';
import mongoose from "mongoose";

export const connect = async () => {
  return await mongoose.connect(MONGO_URL, {dbName: DATABASE_NAME});
}

export const disconnect = async (): Promise<void> => {
  await mongoose.disconnect();
}
