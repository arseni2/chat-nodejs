import {DialogModel} from "../../models/dialogModel/dialog";
import express = require("express");
import {UserModel} from "../../models/user/user";
import {createSecureServer} from "http2";


export const dialogCreate = async (req: express.Request, res: express.Response) => {
    const partner_id = req.body.user_id;
    const user_id = req?.user?._id;
    try {
        let dialog = await new DialogModel({author: user_id, partner: partner_id}).save()
        let user = await UserModel.findOne({_id: user_id})
        user?.dialogs?.push(dialog._id)
        await user?.save()
        res.json({dialog})
    } catch (e: any) {
        if (e.code === 11000) {
            res.status(400).json({error: {message: 'partner id must be unique'}})
        } else if (e.name === "ValidationError") {
            res.status(400).json({
                error: {message: e.errors.partner.message}
            })
        } else {
            res.status(500).json({
                error: {message: 'all very bad'}
            })
        }
    }
}

export const dialogAll = async (req: express.Request, res: express.Response) => {
    let page = Number(req.params.page)
    let perPage = 5 // сколько записей отдаю на странице
    let skip = (page - 1) * perPage
    let dialogs = await DialogModel.find({author: req?.user?._id}).skip(skip).limit(perPage).populate('partner author', 'name lastname avatar -_id')
    let pageCount = await DialogModel.countDocuments()
    let next = page * perPage < pageCount
    let nextPage = next ? page + 1 : null
    res.json({
        dialogs,
        pageCount,
        next,
        nextPage,
    })
}

export const dialogSearch = async (req: express.Request, res: express.Response) => {
    const user_id = req?.user?._id
    const q = req.query.q
    res.json({ds: q})
}
