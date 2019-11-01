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
   * @param {IUserModel} user
   * @returns {Promise < IUserModel >}
   * @memberof ChatService
   */
  async insert(user: IUserModel): Promise<IChatModel> {
    try {
      const chat: IChatModel = new ChatModel({
        members: [user.email]
      });
      const establishedChat: IChatModel = await ChatModel.create(chat);

      return establishedChat;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} chatid
   * @param {IUserModel} user
   * @returns {Promise < IChatModel >}
   * @memberof ChatService
   */
  async delete(chatid: string, user: IUserModel): Promise<IChatModel> {
    try {
      const validate: Joi.ValidationResult<{
        chatid: string;
      }> = ChatValidation.remove({
        chatid
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      //todo: check if user is chat owner b4 delete

      const chat: IChatModel = await ChatModel.findByIdAndRemove(chatid);

      return chat;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} chatid
   * @param {string} userid
   * @param {IUserModel} user
   * @returns {Promise < IUserModel >}
   * @memberof ChatService
   */
  async invite(
    chatid: string,
    userid: string,
    user: IUserModel
  ): Promise<IUserModel> {
    const email = user.email;
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

      //todo: check that the user is in the chat b4 inviting

      await UserModel.update(
        { email: email },
        { $addToSet: { chats: chatid } }
      );
      return await UserModel.findOne({ email: email });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} chatid
   * @param {boolean} accept
   * @param {IUserModel} user
   * @returns {Promise < IUserModel >}
   * @memberof ChatService
   */
  async handleInvite(
    chatid: string,
    accept: boolean,
    user: IUserModel
  ): Promise<IUserModel> {
    const email = user.email;

    try {
      const validate: Joi.ValidationResult<{
        chatid: string;
        accept: boolean;
      }> = ChatValidation.handleInvite({
        chatid,
        accept
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      //todo: redo

      //chatreq -> chat or chatreq -> nothing
      if (accept)
        await UserModel.updateOne(
          { email: email },
          { $push: { chats: chatid } },
          { $pull: { chatRequests: chatid } }
        );
      else
        await UserModel.updateOne(
          { email: email },
          { $pull: { chatsRequests: chatid } }
        );

      return await UserModel.findOne({ email: email });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} chatid
   * @param {IUserModel} user
   * @returns {Promise < IUserModel >}
   * @memberof ChatService
   */
  async remove(chatid: string, user: IUserModel): Promise<IUserModel> {
    const email = user.email;
    try {
      const validate: Joi.ValidationResult<{
        chatid: string;
      }> = ChatValidation.remove({
        chatid
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      await UserModel.update({ email: email }, { $pull: { chats: chatid } });

      return await UserModel.findOne({ email: email });
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default ChatService;
