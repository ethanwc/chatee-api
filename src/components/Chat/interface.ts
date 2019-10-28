import { IChatModel } from "./model";

/**
 * @export
 * @interface IChatService
 */
export interface IChatService {
  /**
   * @returns {Promise<IChatModel>}
   * @memberof IChatService
   */
  createChat(IChatModel: IChatModel): Promise<IChatModel>;
}
