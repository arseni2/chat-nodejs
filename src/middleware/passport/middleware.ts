import express = require("express");
import {passport} from "../../core/passport";
import {NextFunction} from "express";


export function CustomErrorAndRegister(req: express.Request, res: express.Response, next: NextFunction) {
    passport.authenticate('signup', function(err, user, info) {
        console.log(err)
        if (err) { return res.status(400).json({error: {message: err.message}, condition: 'error'}); }
        if (!user) { return res.status(400).json({error: info, condition: 'error'}); }
        req.logIn(user, function(err) {
            if (err) return next(err)
            return next()
        });
    })(req, res, next);
}

export function isAuthProtect(req: express.Request, res: express.Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.status(401).json({
        error: {message: 'user not logined'}
    })
}
