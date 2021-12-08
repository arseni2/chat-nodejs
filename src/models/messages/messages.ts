import {ObjectId} from "mongodb";
import {Document, model, Schema} from "mongoose";

export type messageSchemeType = {
    _id?: typeof ObjectId
    createdAt?: Date
    updatedAt?: Date
    dialog: typeof ObjectId
    text: string
    author: typeof ObjectId
    read?: boolean
}
export type messageModelType = Document<messageSchemeType>
const messagesSchema = new Schema<messageSchemeType>({
    author: {
        type: Schema.Types.ObjectId, ref: 'User', required: true
    },
    dialog: {
        type: Schema.Types.ObjectId, ref: 'Dialog', required: true
    },
    read: {
        type: Boolean,
        default: false
    },
    text: {
        type: String,
        required: true
    }
}, {timestamps: true})

export const MessagesModel = model<messageSchemeType>('Message', messagesSchema)