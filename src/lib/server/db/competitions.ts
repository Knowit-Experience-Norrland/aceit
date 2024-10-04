import { ObjectId } from 'mongodb';
import { GolfCompetitionModel } from './models';

export const getGolfCompetition = async (id: string) => {
  const result = await GolfCompetitionModel.collection.findOne({ _id: new ObjectId(id) }) as Database.GolfCompetition | null;

  if (!result) {
    return null;
  }

  return convertToAppCompetition(result);
}

export const getGolfCompetitions = async (start: number, count: number) => {
  const result = await GolfCompetitionModel.collection.find({}).skip(start).limit(count).toArray() as unknown as Database.GolfCompetition[];

  return result.map(convertToAppCompetition);
}

export const insertGolfCompetition = async (competition: Database.GolfCompetition) => {
  const model = new GolfCompetitionModel(competition);

  await model.validate();
  await model.save();

  return model;
}

const convertToAppCompetition = (competition: Database.GolfCompetition): App.GolfCompetition => {
  const { _id, ...rest } = competition;
  return {
    id: _id?.toString() ?? "",
    ...rest
  }
}
