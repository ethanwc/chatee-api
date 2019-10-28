import * as Joi from "joi";
import ChatModel, { IChatModel } from "./model";
import ChatValidation from "./validation";
import { IChatService } from "./interface";
import { remove } from "../User";
import { Types } from "mongoose";
import { IUserModel } from "../User/model";

/**
 * @export
 * @implements {IChatModelService}
 */
const ChatService: IChatService = {
  /**
   * @param {string} id
   * @returns {Promise < IChatModel >}
   * @memberof UserService
   */
  async findOne(id: string): Promise<IChatModel> {
    try {
      const validate: Joi.ValidationResult<{
        id: string;
      }> = ChatValidation.find({
        id
      });
      if (validate.error) {
        throw new Error(validate.error.message);
      }

      return await ChatModel.findById(id);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  /**
   * @param {IChatModel} chat
   * @returns {Promise < IChatModel[] >}
   * @memberof ChatService
   */
  async findAll(body: IUserModel): Promise<IChatModel[]> {
    try {
      const validate: Joi.ValidationResult<IUserModel> = ChatValidation.findAll(
        body
      );

      if (validate.error) {
        throw new Error(validate.error.message);
      }
      //todo: find all chats a member is in.
      const chats: IChatModel[] = await ChatModel.find();
      return chats;

      // return chats;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {IChatModel} chat
   * @returns {Promise < IChatModel >}
   * @memberof ChatService
   */
  async insert(body: IChatModel): Promise<IChatModel> {
    try {
      const validate: Joi.ValidationResult<IChatModel> = ChatValidation.insert(
        body
      );

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const chat: IChatModel = await ChatModel.create(body);

      return chat;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} id
   * @returns {Promise < IChatModel >}
   * @memberof ChatService
   */
  async remove(id: string): Promise<IChatModel> {
    try {
      const validate: Joi.ValidationResult<{
        id: string;
      }> = ChatValidation.remove({
        id
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const chat: IChatModel = await ChatModel.findOneAndRemove({
        _id: Types.ObjectId(id)
      });

      return chat;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default ChatService;
