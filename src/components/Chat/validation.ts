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
   * @param {{ user: string }} body
   * @returns {Joi.ValidationResult<{ user: string }>}
   * @memberof UserValidation
   */
  chat(body: {
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
}

export default new Chatvalidation();
