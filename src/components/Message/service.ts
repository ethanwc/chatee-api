import * as Joi from "joi";
import ChatModel, { IChatModel } from "../Chat/model";
import MessageModel, { IMessageModel } from "./model";
import MessageValidation from "./validation";
import { IMessageService } from "./interface";
import config from "../../config/env/index";

var Pushy = require("pushy");
var pushyAPI = new Pushy(config.pushy_key);

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

          if (savedMessage) {
            //sets last message id and date
            let updateChat = await ChatModel.findByIdAndUpdate(chatid, {
              $push: { messages: newMessage._id },
              $set: {
                lastMessage: newMessage.message,
                lastMessageDate: newMessage.createdDate
              }
            });

            if (updateChat) {
              //dont send notification to message author...
              let targets: string[] = chat.members.filter(
                (member: any) => member.email !== user
              );

              // Set push payload data to deliver to device(s)
              let message =
                newMessage.type === "image" ? "Image" : newMessage.message;

              var data = {
                message: `${user}: ${message}`
              };

              // Insert target device token(s) here
              var to = [...targets];

              // Set optional push notification options (such as iOS notification fields)
              var options = {
                notification: {
                  badge: 1,
                  sound: "ping.aiff",
                  body: "Hello World \u270c"
                }
              };

              // Send push notification via the Send Notifications API
              // https://pushy.me/docs/api/send-notifications
              pushyAPI.sendPushNotification(data, to, options, function(
                err: any,
                id: string
              ) {
                // Log errors to console
                if (err) {
                  return console.log("Fatal Error", err);
                }

                // Log success
                console.log("Push sent successfully! (ID: " + id + ")");
              });
            }

            return savedMessage;
          } else throw new Error("Failed to save message.");
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
