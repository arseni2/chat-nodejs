import {Document, model, Schema} from "mongoose";
import {ObjectId} from "mongodb";
import { messageSchemeType } from "../messages/messages";


export type DialogSchemaType = {
    author: typeof ObjectId
    partner: typeof ObjectId
    created_at?: string
    updated_at?: string
    _id: typeof ObjectId
    last_message: typeof ObjectId | messageSchemeType
}

export type DialogModelType = Document<DialogSchemaType>

const DialogSchema = new Schema<DialogSchemaType>({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: false,
    },
    partner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: false
    },
    last_message: {
        type: Schema.Types.ObjectId,
        ref: "Message",
        required: false,
    }
}, {timestamps: true})

DialogSchema.set('toJSON', {
    transform: (_, obj) => {
        delete obj.__v
        return obj
    }
})

export const DialogModel = model<DialogSchemaType>('Dialog', DialogSchema)
