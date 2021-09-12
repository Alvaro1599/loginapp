import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface Iuser extends Document {
  username: string;
  email: string;
  password: string;
  encryptPassword(password: string): Promise<string>;
  validatePassword(password: string): Promise<boolean>;
}
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 4,
    lowercase: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.encryptPassword = async (
  password: string
): Promise<string> => {
  const salt = await bcrypt.genSalt(8);
  return bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<Iuser>("User", userSchema);
