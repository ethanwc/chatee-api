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
   * @param {string} id
   * @returns {Joi.ValidationResult<string>}
   * @memberof ChatValidation
   */
  find(id: string): Joi.ValidationResult<string> {
    const schema: Joi.Schema = Joi.object().keys({
      id: Joi.string().required()
    });

    return Joi.validate(id, schema);
  }

  /**
   * @param {IUserModel} params
   * @returns {Joi.ValidationResult<IChatModel >}
   * @memberof ChatValidation
   */
  findAll(params: IUserModel): Joi.ValidationResult<IUserModel> {
    const schema: Joi.Schema = Joi.object().keys({
      id: Joi.string().required()
    });

    return Joi.validate(params, schema);
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
      id: this.customJoi.objectId().required()
    });

    return Joi.validate(body, schema);
  }
}

export default new ChatValidation();
