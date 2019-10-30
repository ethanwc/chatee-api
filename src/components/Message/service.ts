import * as Joi from "joi";
import MessageModel, { IMessageModel } from "./model";
import MessageValidation from "./validation";
import { IMessageService } from "./interface";
import UserModel, { IUserModel } from "../User/model";
import { UserComponent } from "..";
/**
 * @export
 * @implements {IMessageModelService}
 */
const MessageService: IMessageService = {
  /**
   * Creates a new message and stores it in a chat, also updates messages in chat
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

      //check if user is in a chat before adding a message to it
      const authorCandidate: IUserModel = await UserModel.findById(body.author);

      console.log("checking", body, authorCandidate.chats);

      if (authorCandidate.chats.includes(body.id))
        return await MessageModel.create(body);
      else
        throw new Error(
          "User is not a member of the chat, cannot add a message to it."
        );
    } catch (error) {
      throw new Error(error.message);
    }
  },
  /**
   * Modifies a message and notifies messages
   * //todo pushy here
   * @param {IMessageModel} body
   * @returns {Promise < IMessageService >}
   * @memberof MessageService
   */
  async edit(body: IMessageModel): Promise<IMessageModel> {
    try {
      const validate: Joi.ValidationResult<
        IMessageModel
      > = MessageValidation.editMessage(body);

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      //todo: update not just find
      const message: IMessageModel = await MessageModel.findById(body._id);

      return message;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  /**
   * Removes a message from a chat.
   * //todo: pushy here
   * @param {string} id
   * @returns {Promise < IMessageService >}
   * @memberof MessageService
   */
  async remove(id: string): Promise<IMessageModel> {
    try {
      const validate: Joi.ValidationResult<{
        id: string;
      }> = MessageValidation.removeMessage({
        id
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const message: IMessageModel = await MessageModel.findByIdAndDelete(id);

      return message;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default MessageService;
