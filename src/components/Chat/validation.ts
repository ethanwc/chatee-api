import * as Joi from "joi";
import Validation from "../validation";

/**
 * @export
 * @class ChatValidation
 * @extends Validation
 */

class Chatvalidation extends Validation {
  /**
   * Creates an instance of ChatValidation.
   * @memberof ChatValidation
   */
  constructor() {
    super();
  }

  /**
   * @param {{ user: string; chatid: string }} body
   * @returns {Joi.ValidationResult<{ user: string }>}
   * @memberof UserValidation
   */
  chat(body: {
    user: string;
    chatid: string;
  }): Joi.ValidationResult<{
    user: string;
    chatid: string;
  }> {
    const schema: Joi.Schema = Joi.object().keys({
      user: Joi.string()
        .email()
        .required(),
      chatid: Joi.string().required()
    });

    return Joi.validate(body, schema);
  }

  /**
   * @param {{ user: string; newuser: string; chatid: string }} body
   * @returns {Joi.ValidationResult<{ user: string }>}
   * @memberof UserValidation
   */
  invite(body: {
    user: string;
    newuser: string;
    chatid: string;
  }): Joi.ValidationResult<{
    user: string;
    newuser: string;
    chatid: string;
  }> {
    const schema: Joi.Schema = Joi.object().keys({
      user: Joi.string()
        .email()
        .required(),
      newuser: Joi.string()
        .email()
        .required(),
      chatid: Joi.string().required()
    });

    return Joi.validate(body, schema);
  }

  /**
   * @param {{ user: string; removeUser: string; chatid: string }} body
   * @returns {Joi.ValidationResult<{ user: string }>}
   * @memberof UserValidation
   */
  removeUser(body: {
    user: string;
    removeUser: string;
    chatid: string;
  }): Joi.ValidationResult<{
    user: string;
    removeUser: string;
    chatid: string;
  }> {
    const schema: Joi.Schema = Joi.object().keys({
      user: Joi.string()
        .email()
        .required(),
      removeUser: Joi.string()
        .email()
        .required(),
      chatid: Joi.string().required()
    });

    return Joi.validate(body, schema);
  }
  /**
   * @param {{ user: string; chatid: string; accept:boolean }} body
   * @returns {Joi.ValidationResult<{ user: string }>}
   * @memberof UserValidation
   */
  handleInvite(body: {
    user: string;
    chatid: string;
    accept: boolean;
  }): Joi.ValidationResult<{
    user: string;
    chatid: string;
    accept: boolean;
  }> {
    const schema: Joi.Schema = Joi.object().keys({
      user: Joi.string()
        .email()
        .required(),

      chatid: Joi.string().required(),
      accept: Joi.boolean().required()
    });

    return Joi.validate(body, schema);
  }
}

export default new Chatvalidation();
