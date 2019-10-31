import * as Joi from "joi";
import ChatModel, { IChatModel } from "./model";
import ChatValidation from "./validation";
import { IChatService } from "./interface";
import UserModel, { IUserModel } from "../User/model";

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

      const chat: IChatModel = new ChatModel({
        members: [body.id]
      });
      const establishedChat: IChatModel = await ChatModel.create(chat);

      return establishedChat;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} id
   * @returns {Promise < IChatModel >}
   * @memberof ChatService
   */
  async delete(id: string): Promise<IChatModel> {
    try {
      const validate: Joi.ValidationResult<{
        id: string;
      }> = ChatValidation.remove({
        id
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const chat: IChatModel = await ChatModel.findByIdAndRemove(id);

      return chat;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} chatid
   * @param {string} userid
   * @returns {Promise < IUserModel >}
   * @memberof ChatService
   */
  async invite(chatid: string, userid: string): Promise<IUserModel> {
    try {
      const validate: Joi.ValidationResult<{
        chatid: string;
        userid: string;
      }> = ChatValidation.invite({
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
   * @param {boolean} accept
   * @returns {Promise < IUserModel >}
   * @memberof ChatService
   */
  async handleInvite(
    chatid: string,
    userid: string,
    accept: boolean
  ): Promise<IUserModel> {
    try {
      const validate: Joi.ValidationResult<{
        chatid: string;
        userid: string;
        accept: boolean;
      }> = ChatValidation.handleInvite({
        chatid,
        userid,
        accept
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      //chatreq -> chat or chatreq -> nothing
      if (accept)
        await UserModel.update(
          { _id: userid },
          { $push: { chats: chatid } },
          { $pull: { chatRequests: chatid } }
        );
      else
        await UserModel.update({ _id: userid }, { $push: { chats: chatid } });

      return await UserModel.findById(userid);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} chatid
   * @param {string} userid
   * @returns {Promise < IUserModel >}
   * @memberof ChatService
   */
  async remove(chatid: string, userid: string): Promise<IUserModel> {
    try {
      const validate: Joi.ValidationResult<{
        chatid: string;
        userid: string;
      }> = ChatValidation.invite({
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

export default ChatService;
