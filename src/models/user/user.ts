import { Document, model, Schema } from "mongoose";
//import 'moment/locale/ru';
import { DialogSchemaType } from "../dialog/dialog";
import { ObjectId } from "mongodb";
import mongoosePaginate = require("mongoose-paginate-v2");
import moment from 'moment'

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
    last_seen: Date
    dialogs: Array<typeof ObjectId>
}
export type userModelType = Document<userSchemeType>

const userScheme = new Schema<userSchemeType>({
    avatar: { type: String, required: true },
    last_seen: { type: Date, default: new Date() },
    password: { type: String, required: true },
    name: { type: String, unique: true, required: true },
    lastname: { type: String, required: true },
    dialogs: [{ type: Schema.Types.ObjectId, ref: 'Dialog', required: false }]
}, { toJSON: { virtuals: true }, id: false })
userScheme.plugin(mongoosePaginate)



userScheme.virtual("isOnline").get(function () {
    let a = moment(new Date())
    //как нить убрать его
    //@ts-ignore An outer value of 'this' is shadowed by this container
    let b = this.last_seen 
    return a.diff(b, 'minutes', true) < 3;
});
userScheme.set("toJSON", {
    virtuals: true,
    transform: (_, obj) => {
        delete obj.__v
        delete obj.password
        return obj
    }
});

export const UserModel = model<userSchemeType>('User', userScheme)


