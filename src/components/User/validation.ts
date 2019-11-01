import * as Joi from "joi";
import Validation from "../validation";
import { IUserModel } from "./model";

/**
 * @export
 * @class UserValidation
 * @extends Validation
 */
class UserValidation extends Validation {
  /**
   * Creates an instance of UserValidation.
   * @memberof UserValidation
   */
  constructor() {
    super();
  }

  /**
   * @param {{ user: string }} body
   * @returns {Joi.ValidationResult<{ user: string }>}
   * @memberof UserValidation
   */
  user(body: {
    user: string;
  }): Joi.ValidationResult<{
    user: string;
  }> {
    const schema: Joi.Schema = Joi.object().keys({
      user: Joi.string()
        .email()
        .required()
    });

    return Joi.validate(body, schema);
  }

  /**
   * @param {{ user: string; potentialFriend: string }} body
   * @returns {Joi.ValidationResult<{ user: string }>}
   * @memberof UserValidation
   */
  friend(body: {
    user: string;
    potentialFriend: string;
  }): Joi.ValidationResult<{
    user: string;
    potentialFriend: string;
  }> {
    const schema: Joi.Schema = Joi.object().keys({
      user: Joi.string()
        .email()
        .required(),
      potentialFriend: Joi.string()
        .email()
        .required()
    });

    return Joi.validate(body, schema);
  }

  /**
   * @param {{ user: string; potentialFriend: string; accept: boolean }} body
   * @returns {Joi.ValidationResult<{ user: string }>}
   * @memberof UserValidation
   */
  handleFriend(body: {
    user: string;
    potentialFriend: string;
    accept: boolean;
  }): Joi.ValidationResult<{
    user: string;
    potentialFriend: string;
    accept: boolean;
  }> {
    const schema: Joi.Schema = Joi.object().keys({
      user: Joi.string()
        .email()
        .required(),
      potentialFriend: Joi.string()
        .email()
        .required(),
      accept: Joi.boolean().required()
    });

    return Joi.validate(body, schema);
  }
}

export default new UserValidation();
