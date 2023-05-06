import { Schema, model } from "mongoose";

const ReplySchema = new Schema({
  userId: { type: String, require: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  hour: { type: String, required: true },
  timestamp: { type: Number, required: true },
});

const MessageSchema = new Schema({
  userId: { type: String, require: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  hour: { type: String, required: true },
  timestamp: { type: Number, required: true },
  replies: { type: [ReplySchema], default: [] },
});

const Message = model("mensajes", MessageSchema);

export { Message, MessageSchema };
