import { Schema, model, SchemaTypes } from "mongoose";
import mongooseTypePhone from "mongoose-type-phone";
import { MessageSchema } from "./Message.js";

const UserSchema = new Schema({
  nombre: { type: String, required: true },
  edad: { type: Number, required: true },
  email: { type: String, required: true, index: { unique: true } },
  avatar: { type: String, required: true },
  password: { type: String, required: true },
  direccion: { type: String, require: true },
  tel: {
    type: SchemaTypes.Phone,
    required: true,
    allowBlank: false,
    allowedNumberTypes: [
      mongooseTypePhone.PhoneNumberType.MOBILE,
      mongooseTypePhone.PhoneNumberType.FIXED_LINE_OR_MOBILE,
    ],
    phoneNumberFormat: mongooseTypePhone.PhoneNumberFormat.INTERNATIONAL, // can be omitted to keep raw input
    defaultRegion: "AR",
    parseOnGet: false,
  },
  cartId: { type: String, require: true },
  mensajes: { type: [MessageSchema] },
});

const User = model("users", UserSchema);

export { UserSchema, User };
