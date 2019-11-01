import { IChatModel } from "./model";

/**
 * @export
 * @interface IChatService
 */

export interface IChatService {
  /**
   * Creates a new chat.
   * @param {string} user
   * @returns {Promise<IChatModel}
   * @memberof IChatService
   */
  create(user: string): Promise<IChatModel>;

//   /**
//    * Deletes a chat.
//    * @param {string} user
//    * @param {string} chatid
//    * @returns {Promise<IChatModel}
//    * @memberof IChatService
//    */
//   delete(user: string, chatid: string): Promise<IChatModel>;

//   /**
//    * Invites a user to a chat.
//    * @param {string} user
//    * @param {string} newuser
//    * @param {string} chatid
//    * @returns {Promise<IChatModel}
//    * @memberof IChatService
//    */
//   invite(user: string, newuser: string, chatid: string): Promise<IChatModel>;

//   /**
//    * Handles a user invite to a chat.
//    * @param {string} user
//    * @param {string} chatid
//    * @param {boolean} accept
//    * @returns {Promise<IChatModel}
//    * @memberof IChatService
//    */
//   handleInvite(
//     user: string,
//     chatid: string,
//     accept: boolean
//   ): Promise<IChatModel>;

//   /**
//    * Removes a user from a chat.
//    * @param {string} user
//    * @param {string} chatid
//    * @returns {Promise<IChatModel}
//    * @memberof IChatService
//    */
//   remove(user: string, chatid: string): Promise<IChatModel>;
}
