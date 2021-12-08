import {UserModel, userSchemeType} from "../../models/user/user";
import {PaginateResult} from "../../mongoose-paginate";
import express = require("express");

export const userSearch = (req: express.Request, res: express.Response) => {
    const options = {
        limit: 15,
        select: '-dialogs',
        page: Number(req.query.page),
    }
    const q = req.query.q
    //@ts-ignore Property 'paginate' does not exist on type 'Model<userSchemeType, {}, {}, {}>'.
    UserModel.paginate({name: {$regex: new RegExp(`${q}`), $options: 'i'}}, options, (err: any, result: PaginateResult<userSchemeType>) => {
        res.json({...result})
    })
}