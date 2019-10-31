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
   * @param {string} id
   * @param {string} friendid
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
  addFriend(id: string, friendid: string): Promise<IUserModel>;

  /**
   * @param {string} id
   * @param {string} friendid
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
  acceptFriend(id: string, friendid: string): Promise<IUserModel>;

  /**
   * @param {string} id
   * @param {string} friendid
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
  removeFriend(id: string, friendid: string): Promise<IUserModel>;

  /**
   * @param {IUserModel} UserModel
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
  setProfile(IUserModel: IUserModel): Promise<IUserModel>;
}
