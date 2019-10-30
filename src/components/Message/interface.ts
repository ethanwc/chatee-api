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

  /**
   * @param {IMessageModel} IMessageModel
   * @returns {Promise<IMessageModel>}
   * @memberof IMessageService
   */
  // edit(IMessageModel: IMessageModel): Promise<IMessageModel>;

  /**
   * @param {IMessageModel} IMessageModel
   * @returns {Promise<IMessageModel>}
   * @memberof IMessageService
   */
  // remove(IMessageModel: IMessageModel): Promise<IMessageModel>;
}
