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
   * @param {IUserModel} params
   * @returns {Joi.ValidationResult<IUserModel >}
   * @memberof UserValidation
   */
  createUser(params: IUserModel): Joi.ValidationResult<IUserModel> {
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

  /**
   * @param {{ id: string }} body
   * @returns {Joi.ValidationResult<{ id: string }>}
   * @memberof UserValidation
   */
  getUser(body: {
    id: string;
  }): Joi.ValidationResult<{
    id: string;
  }> {
    const schema: Joi.Schema = Joi.object().keys({
      id: this.customJoi.objectId().required()
    });

    return Joi.validate(body, schema);
  }

  /**
   * @param {{ id: string }} body
   * @returns {Joi.ValidationResult<{ id: string }>}
   * @memberof UserValidation
   */
  removeUser(body: {
    id: string;
  }): Joi.ValidationResult<{
    id: string;
  }> {
    const schema: Joi.Schema = Joi.object().keys({
      id: this.customJoi.objectId().required()
    });

    return Joi.validate(body, schema);
  }

  /**
   * @param {{ chatid: string, userid: string }} body
   * @returns {Joi.ValidationResult<IUserModel>}
   * @memberof UserValidation
   */
  addChat(body: {
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
   * @param {{ chatid: string, userid: string }} body
   * @returns {Joi.ValidationResult<IUserModel>}
   * @memberof UserValidation
   */
  removeChat(body: {
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
   * @param {{ id: string, friendid: string }} body
   * @returns {Joi.ValidationResult<IUserModel>}
   * @memberof UserValidation
   */
  friend(body: {
    id: string;
    friendid: string;
  }): Joi.ValidationResult<{
    id: string;
    friendid: string;
  }> {
    const schema: Joi.Schema = Joi.object().keys({
      id: this.customJoi.objectId().required(),
      friendid: this.customJoi.objectId().required()
    });

    return Joi.validate(body, schema);
  }
}

export default new UserValidation();
