import * as Joi from "joi";
import UserModel, { IUserModel } from "./model";
import UserValidation from "./validation";
import { IUserService } from "./interface";
import { Types } from "mongoose";
import { up } from "inquirer/lib/utils/readline";

/**
 * @export
 * @implements {IUserModelService}
 */
const UserService: IUserService = {
  /**
   * @returns {Promise < IUserModel[] >}
   * @memberof UserService
   */
  async findAll(): Promise<IUserModel[]> {
    try {
      return await UserModel.find({});
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
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

      return await UserModel.findOne({
        _id: Types.ObjectId(id)
      });
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

      let user: IUserModel = await UserModel.findById(userid);
      //todo: dup check... dups?
      // if (!user.chats.includes(chatid)) user.chats = [...user.chats, chatid];
      let updatedUser = await UserModel.findByIdAndUpdate(userid, user);

      console.log(updatedUser.chats);

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

      let user: IUserModel = await UserModel.findById(userid);
      //remove chat from user's chats
      user.chats = user.chats.filter(chat => chat !== chatid);

      //todo: update is off by 1 delayed...
      let updatedUser = await UserModel.findByIdAndUpdate(userid, user);

      return updatedUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default UserService;
