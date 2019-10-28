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
   * @param {IUserModel} params
   * @returns {Joi.ValidationResult<IUserModel >}
   * @memberof ChatValidation
   */
  createChat(params: IChatModel): Joi.ValidationResult<IChatModel> {
    const schema: Joi.Schema = Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .email({
          minDomainAtoms: 2
        })
        .required()
    });

    return Joi.validate(params, schema);
  }
}

export default new ChatValidation();
