import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});

export const UserModel: mongoose.Model<App.User> = mongoose.models.users || mongoose.model("users", UserSchema);
