import {IVerifyOptions, Strategy as LocalStrategy} from "passport-local";
import passport = require("passport");
import {UserModel, userModelType, userSchemeType} from "../models/user/user";
import bcrypt = require("bcrypt");
import {UserControllerInstanse} from "../controllers/UserController/UserController";

export type doneType = (err: any, user?: userSchemeType, options?: IVerifyOptions) => void

passport.use(new LocalStrategy(
    {
        usernameField: 'name',
        passwordField: 'password'
    },
    function(username, password, done: doneType) {
        UserModel.findOne({name: username}, (err: any, user: userSchemeType) => {
            if (err) {
                return done(err);
            }
            if(user){
                bcrypt.compare(password, user.password).then(function (result: boolean) {
                    if (result) {
                        return done(null, user)
                    } else {
                        return done(null);
                    }
                });
            }
            else {
                return done(null);
            }
        })
    }
))

passport.use('signup', new LocalStrategy(
    {
        usernameField: 'name',
        passwordField: 'password',
        passReqToCallback: true,
    },
    function(req , username, password, done: doneType) {
        UserModel.findOne({name: req.body.name}, async (err: any, user: userSchemeType) => {
            if (err) {
                return done(err);
            }
            if (user) {
                return done(null, undefined, {message: 'пользователь с таким именем уже есть'})
            } else {
                try {
                    let obj = {
                        ...req.body,
                        avatar: req?.file?.filename
                    }
                    let user = await UserControllerInstanse.createUser(obj)
                    return done(null, user)
                } catch (e) {
                    return done(e, undefined, {message: 'заполни все поля'})
                }
            }
        })
    }
))

passport.serializeUser((user: any, done: doneType) => {
    done(null, user._id)
})
passport.deserializeUser((id: any, done: doneType) => {
    UserModel.findById(id, (err: any, user: userSchemeType) => {
        done(null, user)
    })
})



export {passport}