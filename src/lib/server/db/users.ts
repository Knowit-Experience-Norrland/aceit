import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { UserModel } from './models';

export const getUser = async (id: string) => {
  const options = {
    projection: { password: 0, _id: 0 } // NOTE: if we need _id in the application we must remove it from the projection and convert it to a string
  }

  return await UserModel.collection.findOne({ _id: new ObjectId(id) }, options) as App.User | null;
}

export const getUserDocumentByEmail = async (email: string) => {
  return await UserModel.collection.findOne({ email });
}

export const insertUser = async (user: Database.User) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);

  user.password = hashedPassword;

  const model = new UserModel(user);

  await model.validate();
  await model.save();

  return model;
}

export const userExists = async (email: string) => {
  const count = await UserModel.collection.countDocuments({ email });

  return count > 0;
}
