import { IChatModel } from "./model";
import { IUserModel } from "../User/model";

/**
 * @export
 * @interface IChatService
 */

export interface IChatService {
  /**
   * Get a chat chat.
   * @param {string} user
   * @param {string} chatid
   * @returns {Promise<IChatModel}
   * @memberof IChatService
   */
  getChat(user: string, chatid: string): Promise<IChatModel>;

  /**
   * Creates a new chat.
   * @param {string} user
   * @returns {Promise<IChatModel}
   * @memberof IChatService
   */
  create(user: string): Promise<IChatModel>;

  /**
   * Deletes a chat.
   * @param {string} user
   * @param {string} chatid
   * @returns {Promise<IChatModel}
   * @memberof IChatService
   */
  deleteChat(user: string, chatid: string): Promise<IChatModel>;

  /**
   * Invites a user to a chat.
   * @param {string} user
   * @param {string} newuser
   * @param {string} chatid
   * @returns {Promise<IUserModel>}
   * @memberof IChatService
   */
  invite(user: string, newuser: string, chatid: string): Promise<IUserModel>;

  /**
   * Handles a user invite to a chat.
   * @param {string} user
   * @param {string} chatid
   * @param {boolean} accept
   * @returns {Promise<IChatModel}
   * @memberof IChatService
   */
  handleInvite(
    user: string,
    chatid: string,
    accept: boolean
  ): Promise<IUserModel>;

  /**
   * Removes a user from a chat.
   * @param {string} user
   * @param {string} removeUser
   * @param {string} chatid
   * @returns {Promise<IChatModel}
   * @memberof IChatService
   */
  removeUser(
    user: string,
    removeuser: string,
    chatid: string
  ): Promise<IChatModel>;
}
