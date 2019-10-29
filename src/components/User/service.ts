import * as Joi from "joi";
import UserModel, { IUserModel } from "./model";
import ChatModel, { IChatModel } from "../Chat/model";
import UserValidation from "./validation";
import { IUserService } from "./interface";
import { Types } from "mongoose";
import { up } from "inquirer/lib/utils/readline";
import ChatService from "../Chat/service";
import { ObjectId } from "mongodb";

/**
 * @export
 * @implements {IUserModelService}
 */
const UserService: IUserService = {
  /**
   * Should return all information required to initally launch an app.
   * @param {string} id
   * @returns {Promise < IUserModel >}
   * @memberof UserService
   */
  async findOne(id: string): Promise<IUserModel> {
    try {
      const validate: Joi.ValidationResult<{
        id: string;
      }> = UserValidation.getUser({
        id
      });
      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const User: IUserModel = await UserModel.findById(id);
      //store member ids
      let networkMembers: string[] = [];

      /**
       * Find all chats and associated users
       */

      //convert chats to object ids for db lookup
      let userChats: Array<ObjectId> = [];
      User.chats.forEach(element => {
        userChats.push(new ObjectId(element));
      });
      //also look in chat requests
      User.chatRequests.forEach(element => {
        userChats.push(new ObjectId(element));
      });

      //lookup chats user is in
      let chats: Array<IChatModel> = await ChatModel.find({
        _id: {
          $in: userChats
        }
      });

      //add users from chat to network
      chats.forEach(element => {
        networkMembers = [...networkMembers, ...element.members];
      });

      /**
       * Find unique users
       */

      //get all friends / pending friends
      networkMembers = [
        ...networkMembers,
        ...User.friends,
        ...User.friendRequests
      ];
      //convert to set to remove duplicates
      let uniqueUsers: Set<string> = new Set(networkMembers);
      //convert to ObjectIds
      let uniqueUserObjectIds: Array<ObjectId> = [];
      uniqueUsers.forEach(element => {
        uniqueUserObjectIds.push(new ObjectId(element));
      });
      //todo: only select needed info, not password...
      //find all unique objectids(users)
      User.network = await UserModel.find({
        _id: {
          $in: uniqueUserObjectIds
        }
      });

      return User;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {IUserModel} user
   * @returns {Promise < IUserModel >}
   * @memberof UserService
   */
  async insert(body: IUserModel): Promise<IUserModel> {
    try {
      const validate: Joi.ValidationResult<
        IUserModel
      > = UserValidation.createUser(body);

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const user: IUserModel = await UserModel.create(body);

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} id
   * @returns {Promise < IUserModel >}
   * @memberof UserService
   */
  async remove(id: string): Promise<IUserModel> {
    try {
      const validate: Joi.ValidationResult<{
        id: string;
      }> = UserValidation.removeUser({
        id
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const user: IUserModel = await UserModel.findOneAndRemove({
        _id: Types.ObjectId(id)
      });

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  /**
   * @param {string} chatid
   * @param {string} userid
   * @returns {Promise < IUserModel >}
   * @memberof UserService
   */
  async addChat(chatid: string, userid: string): Promise<IUserModel> {
    try {
      const validate: Joi.ValidationResult<{
        chatid: string;
        userid: string;
      }> = UserValidation.addChat({
        chatid,
        userid
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      await UserModel.update({ _id: userid }, { $addToSet: { chats: chatid } });
      let updatedUser = await UserModel.findById(userid);

      return updatedUser;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} chatid
   * @param {string} userid
   * @returns {Promise < IUserModel >}
   * @memberof UserService
   */
  async removeChat(chatid: string, userid: string): Promise<IUserModel> {
    try {
      const validate: Joi.ValidationResult<{
        chatid: string;
        userid: string;
      }> = UserValidation.addChat({
        chatid,
        userid
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      await UserModel.update({ _id: userid }, { $pull: { chats: chatid } });

      let updatedUser = await UserModel.findById(userid);

      return updatedUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default UserService;
