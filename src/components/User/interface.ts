import { IUserModel } from "./model";

/**
 * @export
 * @interface IUserService
 */
export interface IUserService {
  /**
   * Returns a user based on id.
   * @param {string} user
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
  findOne(user: string): Promise<IUserModel>;

  /**
   * Deletes a user based on id.
   * @param {string} user
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
  delete(user: string): Promise<IUserModel>;

  /**
   * Sends a friend request to potential friend by user.
   * @param {string} user
   * @param {string} potentialFriend
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
  friendRequest(user: string, potentialFriend: string): Promise<IUserModel>;

  /**
   * User accepts / declines a friend request.
   * @param {string} user
   * @param {string} potentialFriend
   * @param {boolean} accept
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
  handleFriend(
    user: string,
    potentialFriend: string,
    accept: boolean
  ): Promise<IUserModel>;

  /**
   * User removes a friend.
   * @param {string} user
   * @param {string} friend
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
  removeFriend(user: string, friend: string): Promise<IUserModel>;

  /**
   * User updates their profile information.
   * @param {string} user
   * @param {JSON} profile
   * @returns {Promise<IUserModel>}
   * @memberof IUserService
   */
  updateProfile(
    user: string,
    profile: JSON
  ): Promise<IUserModel>;
}
