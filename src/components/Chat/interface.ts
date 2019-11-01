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
   * @param {IUserModel} IUserModel
   * @returns {Promise<IChatModel>}
   * @memberof IChatService
   */
  findOne(id: string, user: IUserModel): Promise<IChatModel>;

  /**
   * Create new chat
   * @param {IUserModel} user
   * @returns {Promise<IChatModel>}
   * @memberof IChatService
   */
  insert(user: IUserModel): Promise<IChatModel>;

  /**
   * Delete a chat by id
   * @param {string} id
   * @param {IUserModel} user
   * @returns {Promise<IChatModel>}
   * @memberof IChatModel
   */
  delete(id: string, user: IUserModel): Promise<IChatModel>;

  /**
   * Invite a user to a chat
   * @param {string} chatid
   * @param {string} userid
   * @param {IUserModel} user
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
  invite(chatid: string, userid: string, user: IUserModel): Promise<IUserModel>;

  /**
   * Respond to a chat invite.
   * @param {string} chatid
   * @param {string} userid
   * @param {boolean} accept
   * @param {IUserModel} IUserModel
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
  handleInvite(
    chatid: string,
    accept: boolean,
    user: IUserModel
  ): Promise<IUserModel>;

  /**
   * Remove a user from a chat
   * @param {string} chatid
   * @param {IUserModel} user
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
  remove(chatid: string, user: IUserModel): Promise<IUserModel>;
}
