import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { UserModel } from './models';

const options = {
  projection: { password: 0 } // Do not return password
}

export const getUser = async (id: string) => {

  const databaseUser = await UserModel.collection.findOne({ _id: new ObjectId(id) }, options) as Database.User | null;

  if (!databaseUser) {
    return null;
  }

  return convertToAppUser(databaseUser);
}

export const getUsers = async () => {
  const databaseUsers = await UserModel.collection.find({}, options).toArray() as unknown as Database.User[];

  return databaseUsers.map(convertToAppUser);
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

const convertToAppUser = (user: Database.User): App.User => {
  const { _id, ...rest } = user;
  return {
    id: _id?.toString() ?? "",
    ...rest
  }
}
