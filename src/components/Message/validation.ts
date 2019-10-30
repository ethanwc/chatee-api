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
   * @param {IMessageModel} params
   * @returns {Joi.ValidationResult<IMessageModel >}
   * @memberof MessageValidation
   */
  createMessage(params: IMessageModel): Joi.ValidationResult<IMessageModel> {
    const schema: Joi.Schema = Joi.object().keys({
      id: Joi.string().required(),
      type: Joi.string().required(),
      message: Joi.string().required(),
      author: Joi.string().required()
    });

    return Joi.validate(params, schema);
  }

  /**
   * @param {IMessageModel} params
   * @returns {Joi.ValidationResult<IMessageModel >}
   * @memberof MessageValidation
   */
  editMessage(params: IMessageModel): Joi.ValidationResult<IMessageModel> {
    const schema: Joi.Schema = Joi.object().keys({
      messageid: Joi.string().required(),
      type: Joi.string().required(),
      message: Joi.string().required(),
      author: Joi.string().required()
    });

    return Joi.validate(params, schema);
  }

  /**
   * @param {{ id: string }} body
   * @returns {Joi.ValidationResult<{ id: string }>}
   * @memberof MessageValidation
   */
  removeMessage(body: {
    id: string;
  }): Joi.ValidationResult<{
    id: string;
  }> {
    const schema: Joi.Schema = Joi.object().keys({
      id: Joi.string().required()
    });

    return Joi.validate(body, schema);
  }
}

export default new MessageValidation();
