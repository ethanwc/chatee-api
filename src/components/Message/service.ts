import * as Joi from "joi";
import MessageModel, { IMessageModel } from "./model";
import MessageValidation from "./validation";
import { IMessageService } from "./interface";
/**
 * @export
 * @implements {IMessageModelService}
 */
const MessageService: IMessageService = {
  /**
   * Creates a new message and stores it in a chat, also updates users in chat
   * //todo: pushy here
   * @param {IMessageModel} body
   * @returns {Promise < IMessageService >}
   * @memberof MessageService
   */
  async insert(body: IMessageModel): Promise<IMessageModel> {
    try {
      const validate: Joi.ValidationResult<
        IMessageModel
      > = MessageValidation.createMessage(body);

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const user: IMessageModel = await MessageModel.create(body);

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default MessageService;
