import * as Joi from "joi";
import Validation from "../validation";
import { IChatModel } from "./model";

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
   * @param {IChatModel} params
   * @returns {Joi.ValidationResult<IChatModel >}
   * @memberof ChatValidation
   */
  insertChat(params: IChatModel): Joi.ValidationResult<IChatModel> {
    const schema: Joi.Schema = Joi.object().keys({
        members: Joi.array().required(),
        createdDate: Joi.date().required()
    });

    return Joi.validate(params, schema);
  }

  
    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof ChatValidation
     */
    removeChat(
      body: {
          id: string
      }
  ): Joi.ValidationResult < {
      id: string
  } > {
      const schema: Joi.Schema = Joi.object().keys({
          id: this.customJoi.objectId().required()
      });

      return Joi.validate(body, schema);
  }
}

export default new ChatValidation();
