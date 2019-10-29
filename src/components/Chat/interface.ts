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
  remove(id: string): Promise<IChatModel>;
}
