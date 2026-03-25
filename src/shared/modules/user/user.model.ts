import { User } from '../../types/index.js';
import { Schema, Document, model } from 'mongoose';

export interface UserDocument extends User, Document {}

const userSchema = new Schema({
  email: String,
  avatarPath: String,
  firstname: String,
  lastname: String,
  isPro: Boolean,
});

export const UserModel = model<UserDocument>('User', userSchema);
