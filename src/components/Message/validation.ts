import * as Joi from "joi";
import Validation from "../validation";
import { IMessageModel } from "./model";

/**
 * @export
 * @class MessageValidation
 * @extends Validation
 */
class MessageValidation extends Validation {
  /**
   * Creates an instance of MessageValidation.
   * @memberof MessageValidation
   */
  constructor() {
    super();
  }

  /**
   * @param {IUserModel} params
   * @returns {Joi.ValidationResult<IUserModel >}
   * @memberof MessageValidation
   */
  createMessage(params: IMessageModel): Joi.ValidationResult<IMessageModel> {
    const schema: Joi.Schema = Joi.object().keys({
      type: Joi.string().required(),
      message: Joi.string().required(),
      author: Joi.string().required()
    });

    return Joi.validate(params, schema);
  }
}

export default new MessageValidation();
