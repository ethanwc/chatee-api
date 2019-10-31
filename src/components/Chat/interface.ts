import { IChatModel } from "./model";
import { IUserModel } from "../User/model";

/**
 * @export
 * @interface IChatService
 */
export interface IChatService {
  /**
   * @param {string} id
   * @returns {Promise<IChatModel>}
   * @memberof IChatService
   */
  findOne(id: string): Promise<IChatModel>;

  /**
   * @param {IChatModel} IChatModel
   * @returns {Promise<IChatModel>}
   * @memberof IChatService
   */
  insert(IChatModel: IChatModel): Promise<IChatModel>;

  /**
   * @param {string} id
   * @returns {Promise<IChatModel>}
   * @memberof IChatModel
   */
  delete(id: string): Promise<IChatModel>;

  /**
   * @param {string} chatid
   * @param {string} userid    *
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
  invite(chatid: string, userid: string): Promise<IUserModel>;

  /**
   * @param {string} chatid
   * @param {string} userid
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
  remove(chatid: string, userid: string): Promise<IUserModel>;
}
