import { IMessageModel } from "./model";

/**
 * @exrpot
 * @interface IMessageService
 */
export interface IMessageService {
  /**
   * @param {IMessageModel} IMessageModel
   * @returns {Promise<IMessageModel>}
   * @memberof IMessageService
   */
  insert(IMessageModel: IMessageModel): Promise<IMessageModel>;
}
