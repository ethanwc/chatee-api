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
      id: Joi.string().required()
    });

    return Joi.validate(params, schema);
  }

  /**
   * @param {{ chatid: string }} body
   * @returns {Joi.ValidationResult<{ chatid: string }>}
   * @memberof ChatValidation
   */
  remove(body: {
    chatid: string;
  }): Joi.ValidationResult<{
    chatid: string;
  }> {
    const schema: Joi.Schema = Joi.object().keys({
      chatid: Joi.string().required()
    });

    return Joi.validate(body, schema);
  }

  /**
   * @param {{ chatid: string, userid: string }} body
   * @returns {Joi.ValidationResult<IUserModel>}
   * @memberof UserValidation
   */
  invite(body: {
    userid: string;
    chatid: string;
  }): Joi.ValidationResult<{
    chatid: string;
    userid: string;
  }> {
    const schema: Joi.Schema = Joi.object().keys({
      chatid: this.customJoi.objectId().required(),
      userid: this.customJoi.objectId().required()
    });

    return Joi.validate(body, schema);
  }

   /**
   * @param {{ chatid: string, accept: boolean }} body
   * @returns {Joi.ValidationResult<IUserModel>}
   * @memberof UserValidation
   */
  handleInvite(body: {
    chatid: string;
    accept: boolean;
  }): Joi.ValidationResult<{
    chatid: string;
    accept: boolean;
  }> {
    const schema: Joi.Schema = Joi.object().keys({
      chatid: this.customJoi.objectId().required(),
      accept: Joi.boolean().required()
    });

    return Joi.validate(body, schema);
  }
}

export default new ChatValidation();
