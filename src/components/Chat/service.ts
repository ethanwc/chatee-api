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

      const chat: IChatModel = await ChatModel.findByIdAndRemove(id);

      return chat;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default ChatService;
