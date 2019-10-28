import * as Joi from "joi";
import ChatModel, { IChatModel } from "./model";
import ChatValidation from "./validation";
import { IChatService } from "./interface";
import { Types } from "mongoose";

/**
 * @export
 * @implements {IChatModelService}
 */
const ChatService: IChatService = {
  /**
   * @param {IChatModel} chat
   * @returns {Promise < IChatModel >}
   * @memberof ChatService
   */
  async createChat(body: IChatModel): Promise<IChatModel> {
    try {
      const validate: Joi.ValidationResult<
        IChatModel
      > = ChatValidation.createChat(body);

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const chat: IChatModel = await ChatModel.create(body);

      return chat;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default ChatService;
