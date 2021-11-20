import { Schema } from "mongoose";

export const setRequired = (schema: Schema, options: {required: boolean}) => {
    if (options && options.required) {
        for(let p in schema.paths){
            schema.path(p).required(true);
        }
    }
}