import mongoose, { Schema, Model } from "mongoose";

const kindDiscriminator = { discriminatorKey: 'kind' };
const golfDiscriminatorKey = 'golf';

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});

const UserMetaSchema = new Schema({
  id: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true }
}, kindDiscriminator);

const CompetitionSchema = new Schema({
  active: { type: Boolean, required: true },
  admin: { type: Schema.Types.ObjectId, required: true }
}, kindDiscriminator);

const GolfHoleSchema = new Schema({
  hole: { type: Number, required: true },
  par: { type: Number, required: true },
});

const GolfUserMeta = UserMetaSchema.discriminator(golfDiscriminatorKey, new Schema({
  handicap: { type: Number, required: true }
}, kindDiscriminator));

const GolfStrokesSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true },
  hole: { type: Number, required: true },
  strokes: { type: Number, required: true },
});

const CompetitionModel: Model<Competition> = mongoose.models.competitions || mongoose.model("competitions", CompetitionSchema);

export const UserModel: Model<Database.User> = mongoose.models.users || mongoose.model("users", UserSchema);
export const GolfCompetitionModel: Model<Database.GolfCompetition> = mongoose.models.competitions.discriminators?.golf || CompetitionModel.discriminator(golfDiscriminatorKey, new Schema({
  players: { type: [GolfUserMeta], required: true },
  holes: { type: [GolfHoleSchema], required: true },
  strokes: { type: [GolfStrokesSchema], required: true },
}, kindDiscriminator));
