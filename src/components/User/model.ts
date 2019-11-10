import * as connections from "../../config/connection/connection";
import { Document, Schema } from "mongoose";
import { NextFunction } from "express";

var bcrypt = require("bcryptjs");

/**
 * @export
 * @interface IUserModel
 * @extends {Document}
 */
export interface IUserModel extends Document {
  id: string;
  email: string;
  name: string;
  password: string;
  chats: string[];
  chatRequests: string[];
  friends: string[];
  incomingFriendRequests: string[];
  outgoingFriendRequests: string[];
  passwordResetToken: string;
  passwordResetExpires: Date;
  google: string;
  token: string;
  network: IUserModel[];

  profile: {
    location: string;
    about: string;
    picture: string;
  };
  comparePassword: (password: string) => Promise<boolean>;
}

/**
 * @swagger
 * components:
 *  schemas:
 *    UserSchema:
 *      required:
 *        - email
 *      properties:
 *        email:
 *          type: string
 *        profile:
 *          type: object
 *        password:
 *          type: string
 *        chats:
 *          type: array
 *        friends:
 *          type: array
 *
 */

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
    incomingFriendRequests: Array(),
    outgoingFriendRequests: Array(),
    passwordResetToken: String,
    passwordResetExpires: Date,
    google: String,
    token: String,

    profile: {
      name: String,
      location: String,
      about: String,
      picture: String
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

export default connections.db.model<IUserModel>("UserModel", UserSchema);
