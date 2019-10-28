import { IChatModel } from "./model";

// todo: desired operations: create chat, delete chat, add to chat, remove from chat, new message, delete message,
//setTyping, setNotTyping, 

/**
 * @export
 * @interface IChatService
 */
export interface IChatService {
  /**
   * @returns {Promise<IChatModel>}
   * @memberof IChatService
   */
  insert(IChatModel: IChatModel): Promise<IChatModel>;

  /**
     * @param {string} id
     * @returns {Promise<IChatModel>}
     * @memberof IChatModel
     */
    remove(id: string): Promise<IChatModel>;
}
