import * as Joi from "joi";
import ChatModel, { IChatModel } from "./model";
import ChatValidation from "./validation";
import { IChatService } from "./interface";
import { remove } from "../User";
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
  async insert(body: IChatModel): Promise<IChatModel> {
    try {
      const validate: Joi.ValidationResult<
        IChatModel
      > = ChatValidation.insertChat(body);

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
    async remove(id: string): Promise < IChatModel > {
      try {
          const validate: Joi.ValidationResult < {
              id: string
          } > = ChatValidation.removeChat({
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
