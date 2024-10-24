import mongoose, { Schema, Model } from "mongoose";

const discriminatorKey = 'kind';
const golfDiscriminatorKey = 'golf';

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});

const UserMetaSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true }
}, { _id: false, discriminatorKey });

const ActivitySchema = new Schema({
  active: { type: Boolean, required: true },
  admin: { type: String, required: true },
  members: { type: [UserMetaSchema], required: true },
}, { discriminatorKey });

const GolfHoleSchema = new Schema({
  hole: { type: Number, required: true },
  par: { type: Number, required: true },
}, { _id: false });

const GolfScoreSchema = new Schema({
  hole: { type: Number, required: true },
  strokes: { type: Number, required: true },
}, { _id: false });

const GolfUserMetaSchema = UserMetaSchema.discriminator(golfDiscriminatorKey, new Schema({
  handicap: { type: Number, required: true },
  score: { type: [GolfScoreSchema], required: true },
}, { _id: false }));

// collection base models
const ActivityModel: Model<Activity> = mongoose.models.activities || mongoose.model("activities", ActivitySchema);

// exported models
export const UserModel: Model<Database.User> = mongoose.models.users || mongoose.model("users", UserSchema);
export const GolfActivityModel: Model<Database.GolfActivity> = mongoose.models.activities.discriminators?.golf || ActivityModel.discriminator(golfDiscriminatorKey, new Schema({
  members: { type: [GolfUserMetaSchema], required: true },
  holes: { type: [GolfHoleSchema], required: true },
}));


