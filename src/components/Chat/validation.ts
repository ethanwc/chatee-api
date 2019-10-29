import * as Joi from "joi";
import Validation from "../validation";
import { IChatModel } from "./model";
import { IUserModel } from "../User/model";

/**
 * @export
 * @class ChatValidation
 * @extends Validation
 */
class ChatValidation extends Validation {
  /**
   * Creates an instance of ChatValidation.
   * @memberof ChatValidation
   */
  constructor() {
    super();
  }

  /**
   * @param {{ id: string }} body
   * @returns {Joi.ValidationResult<{ id: string }>}
   * @memberof ChatValidation
   */
  find(body: {
    id: string;
  }): Joi.ValidationResult<{
    id: string;
  }> {
    const schema: Joi.Schema = Joi.object().keys({
      id: Joi.string().required()
    });

    return Joi.validate(body, schema);
  }

  /**
   * @param {IChatModel} params
   * @returns {Joi.ValidationResult<IChatModel >}
   * @memberof ChatValidation
   */
  insert(params: IChatModel): Joi.ValidationResult<IChatModel> {
    const schema: Joi.Schema = Joi.object().keys({
      members: Joi.array().required()
    });

    return Joi.validate(params, schema);
  }

  /**
   * @param {{ id: string }} body
   * @returns {Joi.ValidationResult<{ id: string }>}
   * @memberof ChatValidation
   */
  remove(body: {
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

export default new ChatValidation();
