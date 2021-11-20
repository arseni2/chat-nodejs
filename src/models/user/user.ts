import {Document, model, Schema} from "mongoose";
import 'moment/locale/ru';
import {DialogSchemaType} from "../dialogModel/dialog";
import {ObjectId} from "mongodb";
import moment = require('moment');

export interface userModelInterface extends Document {
    _id: any
    avatar: string
    password: string
    name: string
    lastname: string
    last_seen: string
    dialogs: Array<DialogSchemaType>
}
export type userSchemeType = {
    avatar: string
    password: string
    name: string
    lastname: string
    last_seen: string
    dialogs: Array<typeof ObjectId>
}
export type userModelType = Document<userSchemeType>

const userScheme = new Schema<userSchemeType>({
    avatar: {type: String, required: true},
    last_seen: {type: String, default: moment().format('LT')},
    password: {type: String, required: true},
    name: {type: String, unique: true, required: true},
    lastname: {type: String, required: true},
    dialogs: [{ type: Schema.Types.ObjectId, ref: 'Dialog', required: false}]
})

export const UserModel = model<userSchemeType>('User', userScheme)
