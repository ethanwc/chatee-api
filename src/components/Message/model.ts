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
 *    ChatSchema:
 *      required:
 *        - type
 *        - createdDate
 *        - author
 *        - message
 *      properties:
 *        reactions:
 *          type: Array<JSON>
 *        editDate:
 *          type: string
 *          format: date
 *          type: Array<string>
 *    Chats:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/ChatSchema'
 */
const ChatSchema: Schema = new Schema(
  {
    type: String,
    author: String,
    message: String,
    createdDate: Date,
    editDate: Date,
    // reactions: []
   },
  {
    collection: "MessageModel",
    versionKey: false
  }
);

export default connections.db.model<IMessageModel>("MessageModel", ChatSchema);
