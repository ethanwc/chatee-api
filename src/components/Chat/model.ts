import * as connections from "../../config/connection/connection";
import { Document, Schema } from "mongoose";
import { IMessageModel } from "../Message/model";

/**
 * @export
 * @interface IChatModel
 * @extends {Document}
 */
export interface IChatModel extends Document {
  messages: Array<string>;
  members: Array<string>;
  membersTyping: Array<string>;
  creator: String;
  createdDate: Date;
  lastMessage: string;
  lastMessageDate: Date;
}

const ChatSchema: Schema = new Schema(
  {
    messages: Array<String>(),
    members: Array<String>(),
    membersTyping: Array<String>(),
    creator: String,
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
