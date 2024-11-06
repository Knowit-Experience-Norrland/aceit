import { ObjectId } from 'mongodb';
import { GolfActivityModel } from './models';

export const getGolfActivity = async (id: string) => {
  const result = await GolfActivityModel.collection.findOne({ _id: new ObjectId(id) }) as Database.GolfActivity | null;

  if (!result) {
    return null;
  }

  return convertToAppActivity(result);
}

export const getGolfActivities = async (start: number, count: number) => {
  const result = await GolfActivityModel.collection.find({}).skip(start).limit(count).toArray() as unknown as Database.GolfActivity[];

  return result.map(convertToAppActivity);
}

export const insertGolfActivity = async (activity: Database.GolfActivity) => {
  const model = new GolfActivityModel(activity);

  await model.validate();
  await model.save();

  return model;
}

export const updateGolfActivity = async(activity: App.GolfActivity) => {
  const golfActivity = await GolfActivityModel.findByIdAndUpdate(activity.id, activity, {new:true});

  await golfActivity?.validate();
  await golfActivity?.save();

  return golfActivity;
}

const convertToAppActivity = (activity: Database.GolfActivity): App.GolfActivity => {
  const { _id, ...rest } = activity;
  return {
    id: _id?.toString() ?? "",
    ...rest
  }
}
