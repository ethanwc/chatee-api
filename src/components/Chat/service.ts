import * as Joi from "joi";
import ChatModel, { IChatModel } from "./model";
import ChatValidation from "./validation";
import { IChatService } from "./interface";

/**
 * @export
 * @implements {IChatModelService}
 */
const ChatService: IChatService = {
  /**
   * @param {string} user
   * @returns {Promise < IUserModel >}
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

      return savedChat;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default ChatService;
