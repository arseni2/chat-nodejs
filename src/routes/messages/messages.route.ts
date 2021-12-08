import socket from 'socket.io'
import {Express} from "express";
import {isAuthProtect} from "../../middleware/passport/middleware";
import {MessagesModel} from "../../models/messages/messages";


export const messagesRoute = (io: socket.Server, app: Express) => {
    io.on("connection", (socket) => {
        console.log('socket connect')
    });
    app.get('/message/all', isAuthProtect, async (req, res) => {
        const { dialog_id } = req.query
        //@ts-ignore
        let messages = await MessagesModel.find({dialog: dialog_id}).populate('author', '-dialogs -__v -last_seen -password -_id').lean()
        res.json({messages})
    })
    app.post('/message/create', isAuthProtect, async (req, res) => {
        const { dialog_id } = req.body
        const { text } = req.body
        const user_id = req?.user?._id
        let message = await (await new MessagesModel({
            author: user_id,
            dialog: dialog_id,
            text,
        }).save()).populate('author', '-dialogs -__v -last_seen -password')
        io.emit('add message', {message})
        res.json({success: true})
    })
}