import { IMessageModel } from "./model";

/**
 * @exports
 * @interface IMessageService
 */

export interface IMessageService {
  /**
   * Creates a new message.
   * @param {string} user
   * @param {IMessageModel} message
   * @param {string} chatid
   * @returns {Promise<IMessageModel}
   * @memberof IChatService
   */
  create(
    user: string,
    message: IMessageModel,
    chatid: string
  ): Promise<IMessageModel>;

  /**
   * Modifies a message.
   * @param {string} user
   * @param {IMessageModel} message
   * @param {string} messageid
   * @returns {Promise<IMessageModel}
   * @memberof IChatService
   */
  edit(
    user: string,
    message: IMessageModel,
    messageid: string
  ): Promise<IMessageModel>;

  /**
   * Deletes a message.
   * @param {string} user
   * @param {string} messageid
   * @param {string} chatid
   * @returns {Promise<IMessageModel}
   * @memberof IChatService
   */
  deleteMessage(
    user: string,
    messageid: string,
    chatid: string
  ): Promise<IMessageModel>;
}
