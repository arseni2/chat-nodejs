import {Express} from "express";
import {upload} from "../../core/multer";
import {passport} from "../../core/passport";
import {CreateUserView} from "../../views/authViews/views";
import {CustomErrorAndRegister} from "../../middleware/passport/middleware";


export const authRoute = (app: Express) => {
    app.post('/register', upload.single('avatar'), async(req, res)=>{
        await CreateUserView(req, res)
    })
    app.post('/login', passport.authenticate('local', {session: true}), (req, res)=>{
        console.log(req.user)
        res.json({condition: 'success'})
    })
    app.post('/registration', upload.single('avatar'), CustomErrorAndRegister, (req, res)=>{
        res.json({condition: 'success'})
    })
    app.get('/profile', (req, res)=>{

        req.user ? res.json({user: req.user}) : res.status(401).json({error: ['user not authorized']})
    })
}