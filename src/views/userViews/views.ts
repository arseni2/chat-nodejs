import {UserModel, userSchemeType} from "../../models/user/user";
import {PaginateResult} from "../../mongoose-paginate";
import express = require("express");


export const userPagination = async (req: express.Request, res: express.Response) => {
    const options = {
        limit: 1,
        lean: true,
        select: '-dialogs',
        page: Number(req.query.page)
    }
    //@ts-ignore Property 'paginate' does not exist on type 'Model<userSchemeType, {}, {}, {}>'.
    await UserModel.paginate({}, options, (err: any, result: PaginateResult<userSchemeType>) => {
        if (err) {
            res.status(500).json({
                error: {message: 'paginate error'}
            })
        }
        res.json({...result})
    })
}

export const userSearch = async (req: express.Request, res: express.Response) => {
    const q = req.query.q
    const users = await UserModel.find({
        name: {$regex: new RegExp(`${q}`), $options: 'i'}
    })
    res.json({users})
}