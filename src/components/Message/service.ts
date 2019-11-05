import * as Joi from "joi";
import ChatModel, { IChatModel } from "../Chat/model";
import MessageModel, { IMessageModel } from "./model";
import MessageValidation from "./validation";
import { IMessageService } from "./interface";

/**
 * @export
 * @implements {IMessageModelService}
 */
const MessageService: IMessageService = {
  /**
   * @param {string} user
   * @param {IMessageModel} message
   * @param {string} chatid
   * @returns {Promise < IMessageModel >}
   * @memberof ChatService
   */
  async create(
    user: string,
    message: IMessageModel,
    chatid: string
  ): Promise<IMessageModel> {
    try {
      const validate: Joi.ValidationResult<{
        user: string;
        message: IMessageModel;
        chatid: string;
      }> = MessageValidation.create({
        user,
        message,
        chatid
      });

      if (validate.error) throw new Error(validate.error.message);

      //neccesary checks
      //make sure chat exists
      //make sure user is member of chat

      //todo: pushy here notify of new chat msg.

      const newMessage: IMessageModel = new MessageModel({
        author: user,
        type: message.type,
        message: message.message,
        createdDate: new Date().toString(),
        editDate: new Date().toString()
      });

      let chat: IChatModel = await ChatModel.findById(chatid);

      if (chat) {
        if (chat.members.includes(user)) {
          //add new message if conditions are met
          const savedMessage: IMessageModel = await newMessage.save();

          //sets last message id and date
          ChatModel.findByIdAndUpdate(chatid, {
            $push: { messages: newMessage._id },
            $set: {
              lastMessage: newMessage._id,
              lastMessageDate: newMessage.createdDate
            }
          });

          return savedMessage;
        } else throw new Error("User is not a member of the chat");
      } else throw new Error("Chat not found");
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} user
   * @param {IMessageModel} message
   * @param {string} messageid
   * @returns {Promise < IMessageModel >}
   * @memberof ChatService
   */
  async edit(
    user: string,
    message: IMessageModel,
    messageid: string
  ): Promise<IMessageModel> {
    try {
      const validate: Joi.ValidationResult<{
        user: string;
        message: IMessageModel;
        messageid: string;
      }> = MessageValidation.edit({
        user,
        message,
        messageid
      });

      if (validate.error) throw new Error(validate.error.message);

      //neccesary checks
      //make sure message exists
      //make sure user is author of message

      let oldMessage: IMessageModel = await MessageModel.findById(messageid);

      if (message) {
        const newMessage: IMessageModel = new MessageModel({
          author: oldMessage.author,
          type: message.type,
          message: message.message,
          createdDate: oldMessage.createdDate,
          editDate: new Date().toString()
        });
        if (message.author === user) {
          await MessageModel.findByIdAndUpdate(messageid, newMessage);
          return await MessageModel.findById(messageid);
        } else throw new Error("Only author can edit message.");
      } else throw new Error("Failed to find message.");
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} user
   * @param {string} messageid
   * @param {string} chatid
   * @returns {Promise < IMessageModel >}
   * @memberof ChatService
   */
  async deleteMessage(
    user: string,
    messageid: string,
    chatid: string
  ): Promise<IMessageModel> {
    try {
      const validate: Joi.ValidationResult<{
        user: string;
        messageid: string;
        chatid: string;
      }> = MessageValidation.delete({
        user,
        messageid,
        chatid
      });

      if (validate.error) throw new Error(validate.error.message);

      //neccesary checks
      //make sure message exists
      //make sure user is author of message

      //remove messageid from chats
      let message: IMessageModel = await MessageModel.findById(messageid);

      if (message) {
        if (message.author === user) {
          return await MessageModel.findByIdAndRemove(messageid);
        } else throw new Error("Only author can delete message.");
      } else throw new Error("Failed to find message.");
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default MessageService;
