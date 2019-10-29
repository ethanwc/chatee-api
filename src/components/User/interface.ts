import { IUserModel } from "./model";

/**
 * @export
 * @interface IUserService
 */
export interface IUserService {
  /**
   * @param {string} id
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
  findOne(id: string): Promise<IUserModel>;

  /**
   * @param {IUserModel} IUserModel
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
  insert(IUserModel: IUserModel): Promise<IUserModel>;

  /**
   * @param {string} id
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
  remove(id: string): Promise<IUserModel>;

  /**
   * @param {string} chatid
   * @param {string} userid    *
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
  addChat(chatid: string, userid: string): Promise<IUserModel>;

  /**
   * @param {string} chatid
   * @param {string} userid
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
  removeChat(chatid: string, userid: string): Promise<IUserModel>;
}
