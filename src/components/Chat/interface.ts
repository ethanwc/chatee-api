import { IChatModel } from "./model";
import { IUserModel } from "../User/model";

/**
 * @export
 * @interface IChatService
 */
export interface IChatService {
  /**
   * Find chat by id
   * @param {string} id
   * @returns {Promise<IChatModel>}
   * @memberof IChatService
   */
  findOne(id: string): Promise<IChatModel>;

  /**
   * Create new chat
   * @param {IChatModel} IChatModel
   * @returns {Promise<IChatModel>}
   * @memberof IChatService
   */
  insert(IChatModel: IChatModel): Promise<IChatModel>;

  /**
   * Delete a chat by id
   * @param {string} id
   * @returns {Promise<IChatModel>}
   * @memberof IChatModel
   */
  delete(id: string): Promise<IChatModel>;

  /**
   * Invite a user to a chat
   * @param {string} chatid
   * @param {string} userid
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
  invite(chatid: string, userid: string): Promise<IUserModel>;

  /**
   * Respond to a chat invite.
   * @param {string} chatid
   * @param {string} userid
   * @param {boolean} accept
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
  handleInvite(
    chatid: string,
    userid: string,
    accept: boolean
  ): Promise<IUserModel>;

  /**
   * Remove a user from a chat
   * @param {string} chatid
   * @param {string} userid
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
  remove(chatid: string, userid: string): Promise<IUserModel>;
}
