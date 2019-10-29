import * as connections from "../../config/connection/connection";
import { Document, Schema } from "mongoose";
import { IMessageModel } from "../Message/model";

/**
 * @export
 * @interface IChatModel
 * @extends {Document}
 */
export interface IChatModel extends Document {
  members: Array<string>;
  membersTyping: Array<string>;
  createdDate: Date;
  messages: Array<IMessageModel>;
  lastMessage: string;
  lastMessageDate: Date;
}

/**
 * @swagger
 * components:
 *  schemas:
 *    ChatSchema:
 *      required:
 *        - members
 *        - createdDate
 *      properties:
 *        members:
 *          type: Array<string>
 *        createdDate:
 *          type: string
 *          format: date
 *        membersTyping:
 *          type: Array<string>
 *        lastMessage:
 *          type: string
 *        lastMessageDate:
 *          type: string
 *          format: date
 *    Chats:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/ChatSchema'
 */
const ChatSchema: Schema = new Schema(
  {
    members: Array<String>(),
    membersTyping: Array<String>(),
    createdDate: Date,
    lastMessage: String,
    lastMessageDate: Date
  },
  {
    collection: "chatmodel",
    versionKey: false
  }
);

export default connections.db.model<IChatModel>("ChatModel", ChatSchema);
