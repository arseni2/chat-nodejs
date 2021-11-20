import {UserControllerInstanse} from "../../controllers/UserController/UserController";
import express = require("express");


export const CreateUserView = async (req: express.Request, res: express.Response) => {
    let obj = {
        ...req.body,
        avatar: req?.file?.filename,
    }
    try {
        let user = await UserControllerInstanse.createUser(obj)
        res.json({user})
    }
    catch (e) {
        res.status(400).json({
            error: e
        })
    }
}