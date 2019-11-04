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
   * @param {{ user: string; message: IMessageModel; chatid: string }} body
   * @returns {Joi.ValidationResult<{ user: string }>}
   * @memberof UserValidation
   */
  create(body: {
    user: string;
    message: IMessageModel;
    chatid: string;
  }): Joi.ValidationResult<{
    user: string;
    message: IMessageModel;
    chatid: string;
  }> {
    const schema: Joi.Schema = Joi.object().keys({
      user: Joi.string()
        .email()
        .required(),
      message: Joi.required(),
      chatid: Joi.string().required()
    });

    return Joi.validate(body, schema);
  }

  /**
   * @param {{ user: string; message: IMessageModel; messageid: string }} body
   * @returns {Joi.ValidationResult<{ user: string }>}
   * @memberof UserValidation
   */
  edit(body: {
    user: string;
    message: IMessageModel;
    messageid: string;
  }): Joi.ValidationResult<{
    user: string;
    message: IMessageModel;
    messageid: string;
  }> {
    const schema: Joi.Schema = Joi.object().keys({
      user: Joi.string()
        .email()
        .required(),
      message: Joi.required(),
      messageid: Joi.string().required()
    });

    return Joi.validate(body, schema);
  }

  /**
   * @param {{ user: string; messageid: string; chatid: string}} body
   * @returns {Joi.ValidationResult<{ user: string }>}
   * @memberof UserValidation
   */
  delete(body: {
    user: string;
    messageid: string;
    chatid: string;
  }): Joi.ValidationResult<{
    user: string;
    messageid: string;
    chatid: string;
  }> {
    const schema: Joi.Schema = Joi.object().keys({
      user: Joi.string()
        .email()
        .required(),
      messageid: Joi.string().required(),
      chatid: Joi.string().required()
    });

    return Joi.validate(body, schema);
  }
}

export default new MessageValidation();
