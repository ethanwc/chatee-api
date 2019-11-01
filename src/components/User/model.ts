import * as bcrypt from "bcrypt";
import * as connections from "../../config/connection/connection";
import * as crypto from "crypto";
import { Document, Schema } from "mongoose";
import { NextFunction } from "express";

/**
 * @export
 * @interface IUserModel
 * @extends {Document}
 */
export interface IUserModel extends Document {
  email: string;
  password: string;
  chats: string[];
  chatRequests: string[];
  friends: string[];
  friendRequests: string[];
  passwordResetToken: string;
  passwordResetExpires: Date;
  google: string;
  tokens: string;
  network: IUserModel[];

  profile: {
    name: string;
    location: string;
    about: string;
    picture: string;
  };
  comparePassword: (password: string) => Promise<boolean>;
  gravatar: (size: number) => string;
}



const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      trim: true
    },
    password: String,
    chats: Array(),
    chatRequests: Array(),
    friends: Array(),
    friendRequests: Array(),
    passwordResetToken: String,
    passwordResetExpires: Date,
    google: String,
    tokens: String,

    profile: {
      name: String,
      location: String,
      about: String,
      picture: String,
    }
  },
  {
    collection: "usermodel",
    versionKey: false
  }
).pre("save", async function(next: NextFunction): Promise<void> {
  const user: any = this; // tslint:disable-line

  if (!user.isModified("password")) {
    return next();
  }

  try {
    const salt: string = await bcrypt.genSalt(10);

    const hash: string = await bcrypt.hash(user.password, salt);

    user.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

/**
 * Method for comparing passwords
 */
UserSchema.methods.comparePassword = async function(
  candidatePassword: string
): Promise<boolean> {
  try {
    const match: boolean = await bcrypt.compare(
      candidatePassword,
      this.password
    );

    return match;
  } catch (error) {
    return error;
  }
};

/**
 * Helper method for getting user's gravatar.
 */
//todo: delete me
UserSchema.methods.gravatar = function(size: number): string {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5: string = crypto
    .createHash("md5")
    .update(this.email)
    .digest("hex");

  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

export default connections.db.model<IUserModel>("UserModel", UserSchema);
