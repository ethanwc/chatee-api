import * as Joi from "joi";
import UserModel, { IUserModel } from "../User/model";
import ChatModel, { IChatModel } from "./model";
import ChatValidation from "./validation";
import { IChatService } from "./interface";
import MessageModel, { IMessageModel } from "../Message/model";

/**
 * @export
 * @implements {IChatModelService}
 */
const ChatService: IChatService = {
  /**
   * @param {string} user
   * @returns {Promise < IChatModel >}
   * @memberof ChatService
   */

  async getAllChatsInfo(user: string): Promise<IChatModel[]> {
    try {
      const validate: Joi.ValidationResult<{
        user: string;
      }> = ChatValidation.chatInfo({
        user
      });

      if (validate.error) throw new Error(validate.error.message);

      let founduser: IUserModel = await UserModel.findOne({ email: user });

      //get invites also to display information about them

      let chats: IChatModel[] = await ChatModel.find({
        _id: { $in: [...founduser.chats, ...founduser.chatRequests] }
      });

      return chats;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getChat(user: string, chatid: string): Promise<IChatModel> {
    try {
      const validate: Joi.ValidationResult<{
        user: string;
        chatid: string;
      }> = ChatValidation.chat({
        user,
        chatid
      });

      if (validate.error) throw new Error(validate.error.message);

      //find chat by id, if user is member, return chat info

      let chat: IChatModel = await ChatModel.findById(chatid);

      if (chat) {
        if (chat.members.includes(user)) {
          let fullMessages: IMessageModel[] = await MessageModel.find({
            _id: { $in: chat.messages }
          });
          chat.fullMessages = fullMessages;

          return chat;
        } else throw new Error("User is not a member of the chat");
      } else throw new Error("Chat does not exist");
    } catch (error) {
      throw new Error(error.message);
    }
  },
  /**
   * @param {string} user
   * @returns {Promise < IChatModel >}
   * @memberof ChatService
   */
  async create(user: string): Promise<IChatModel> {
    try {
      //create a new chat with the creator as the author and member
      const chat: IChatModel = new ChatModel({
        creator: user,
        createdDate: new Date().toString(),
        members: [user]
      });

      const savedChat: IChatModel = await chat.save();

      await UserModel.findOneAndUpdate(
        { email: user },
        { $addToSet: { chats: savedChat._id } }
      );

      return savedChat;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} user
   * @param {string} chatid
   * @returns {Promise < IChatModel >}
   * @memberof ChatService
   */
  async deleteChat(user: string, chatid: string): Promise<IChatModel> {
    try {
      const validate: Joi.ValidationResult<{
        user: string;
        chatid: string;
      }> = ChatValidation.chat({
        user,
        chatid
      });

      if (validate.error) throw new Error(validate.error.message);

      //neccesary checks:
      //user is creator of chat
      const chat: IChatModel = await ChatModel.findById(chatid);

      if (chat) {
        if (chat.creator === user) {
          return await ChatModel.findByIdAndRemove(chatid);
        } else throw new Error("Only the creator can delete the chat.");
      } else throw new Error("Cannot find chat.");
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} user
   * @param {string} newuser
   * @param {string} chatid
   * @returns {Promise < IUserModel >}
   * @memberof ChatService
   */
  async invite(
    user: string,
    newuser: string,
    chatid: string
  ): Promise<IUserModel> {
    try {
      const validate: Joi.ValidationResult<{
        user: string;
        newuser: string;
        chatid: string;
      }> = ChatValidation.invite({
        user,
        newuser,
        chatid
      });

      if (validate.error) throw new Error(validate.error.message);

      //todo: pushy here, notify of invite

      //neccesary checks:
      //chat exists
      //member inviting is already in the chat
      //new member exists and isnt in the chat

      //add chat to new members chat requests

      const chat: IChatModel = await ChatModel.findById(chatid);

      if (chat) {
        if (chat.members.includes(user)) {
          let potentialMember: IUserModel = await UserModel.findOne({
            email: newuser
          });

          if (potentialMember) {
            if (!potentialMember.chatRequests.includes(chatid)) {
              return await UserModel.findOneAndUpdate(
                { email: newuser },
                { $addToSet: { chatRequests: chatid } }
              );
            } else throw new Error("They have already been invited.");
          } else throw new Error("Cannot find potential member.");
        } else throw new Error("Cannot be invited by a non-member.");
      } else throw new Error("Cannot find chat.");
    } catch (error) {
      throw new Error(error.message);
    }
  },
  /**
   * @param {string} user
   * @param {string} chatid
   * @param {boolean} accept
   * @returns {Promise < IUserModel >}
   * @memberof ChatService
   */
  async handleInvite(
    user: string,
    chatid: string,
    accept: boolean
  ): Promise<IUserModel> {
    try {
      const validate: Joi.ValidationResult<{
        user: string;
        chatid: string;
        accept: boolean;
      }> = ChatValidation.handleInvite({
        user,
        chatid,
        accept
      });

      if (validate.error) throw new Error(validate.error.message);

      //todo: pushy here: user accepted invite?

      //neccesary checks:
      //chat exists
      //user has a pending request to the chat
      let chat: IChatModel = await ChatModel.findById(chatid);
      let invitedUser: IUserModel = await UserModel.findOne({ email: user });

      if (chat) {
        if (invitedUser.chatRequests.includes(chatid)) {
          //add user to list of chat's members
          await ChatModel.findByIdAndUpdate(chatid, {
            $addToSet: { members: user }
          });
          //add chat to user's chats
          await UserModel.findOneAndUpdate(
            { email: user },
            { $addToSet: { chats: chatid } }
          );
          //remove chat from users chat requests
          await UserModel.findOneAndUpdate(
            { email: user },
            { $pull: { chatRequests: chatid } }
          );

          return await UserModel.findOne({ email: user }).select(
            "-password -_id"
          );
        } else
          throw new Error(
            "Cannot accept invite to something you aren't invited to."
          );
      } else throw new Error("Cannot find chat.");
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} user
   * @param {string} removeUser
   * @param {string} chatid
   * @returns {Promise < IUserModel >}
   * @memberof ChatService
   */
  async removeUser(
    user: string,
    removeUser: string,
    chatid: string
  ): Promise<IChatModel> {
    try {
      const validate: Joi.ValidationResult<{
        user: string;
        removeUser: string;
        chatid: string;
      }> = ChatValidation.removeUser({
        user,
        removeUser,
        chatid
      });

      if (validate.error) throw new Error(validate.error.message);

      const chat: IChatModel = await ChatModel.findById(chatid);

      let superuser: IUserModel = await UserModel.findOne({ email: user });

      let removeuser: IUserModel = await UserModel.findOne({
        email: removeUser
      });

      //check that chat exists
      //check that user to remove is in the chat
      if (chat) {
        if (chat.members.includes(removeUser) && superuser && removeuser) {
          //chat owner cannot remove themself, they should delete the chat instead
          if (chat.creator !== removeUser) {
            //allowed to remove everyone
            if (chat.creator === user || user === removeUser) {
              await ChatModel.findByIdAndUpdate(chatid, {
                $pull: { members: removeUser }
              });
              //remove chat from chats in user
              await UserModel.findByIdAndUpdate(
                { email: removeuser },
                { $pull: { chats: chatid } }
              );

              return await ChatModel.findById(chatid);
            }
          }
        } else throw new Error("Cannot remove someone who isn't in a chat.");
      } else throw new Error("Cannot find chat.");
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default ChatService;
