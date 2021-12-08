import { DialogModel } from "../../models/dialog/dialog";
import { UserModel } from "../../models/user/user";
import express = require("express");


export const dialogCreate = async (req: express.Request, res: express.Response) => {
    const partner_id = req.body.user_id;
    const user_id = req?.user?._id;
    try {
        let dialogDuplicate = await DialogModel.find({ author: user_id, partner: partner_id })
        if (dialogDuplicate.length !== 0) {
            res.status(403).json({
                error: { message: 'такой диалог уже есть' },
                condition: false
            })
        } else {
            let dialog = await new DialogModel({ author: user_id, partner: partner_id }).save()
            let user = await UserModel.findOne({ _id: user_id })
            user?.dialogs?.push(dialog._id)
            await user?.save()
            res.json({ condition: true })
        }
    } catch (e: any) {
        if (e.name === "ValidationError") {
            res.status(400).json({
                error: { message: e.errors.partner.message },
                condition: false
            })
        } else {
            res.status(500).json({
                error: { message: 'all very bad' },
                condition: false
            })
        }
    }
}

export const dialogAll = async (req: express.Request, res: express.Response) => {
    let dialogs = await DialogModel.find({$or: [{ author: req?.user?._id}, {partner: req?.user?._id}]}).populate('partner author', 'name lastname avatar id')
    res.json({ dialogs })
}

export const dialogDetail = async (req: express.Request, res: express.Response) => {
    const { dialog_id } = req.params
    try {
        const dialog = await DialogModel.findById(dialog_id).populate('partner author', 'name lastname avatar id')
        res.json({ dialog })
    } catch (e) {
        res.status(400).json({
            error: { message: 'dialog id is not valid' }
        })
    }
}



