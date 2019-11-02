import * as connections from "../../config/connection/connection";
import { Document, Schema } from "mongoose";

/**
 * @export
 * @interface IMessageModel
 * @extends {Document}
 */
export interface IMessageModel extends Document {
  type: string;
  author: string;
  message: string;
  createdDate: Date;
  editDate: Date;
  //todo: reactions
  //   reactions: [];
}

/**
 * @swagger
 * components:
 *  schemas:
 *    MessageSchema:
 *      required:
 *        - author
 *      properties:
 *        type:
 *          type: string
 *        author:
 *          type: string
 *        message:
 *          type: string
 *        createdDate:
 *          type: array
 *        editDate:
 *          type: string
 */

const MessageModel: Schema = new Schema(
  {
    type: String,
    author: String,
    message: String,
    createdDate: Date,
    editDate: Date
    // reactions: []
  },
  {
    collection: "MessageModel",
    versionKey: false
  }
);

export default connections.db.model<IMessageModel>(
  "MessageModel",
  MessageModel
);
