require('dotenv').config()
import {userRoute} from "./routes/user/user.route";
import {dialogRoute} from "./routes/dialog/dialog.route";
import {host, port, secret_key} from "./config";
import {authRoute} from "./routes/auth/auth.route";
import {InitServer} from "./core/db";
import flash = require('express-flash');
import passport = require("passport");
import session = require("express-session");
import express = require("express");

const MongoDBStore = require('connect-mongodb-session')(session);

//TODO:
    //4. после написания всей логики провети рефакторинг (вынести некоторые данные в env, удалить некоторые пакеты,постараться убрать все ts-ignore ...)
    //5. сделать вывод lastMessage у dialog
//MORE:
    //1. поправить типизацию с user in req вынести в декларатион файл
    //2. user.last_seen работает не корректно
    //3. сделать так чтобы нельза с одним partner создать несколько диалогов
    //4. сделать поиск диалогов mongoose-fuzzy-searching, https://bit.ly/30Ic3LA
//ADVICE(советы):
    //1. писать код смотря в заметку по chatapp, чистый код
    //2. глядеть в заметку chatapp


const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/session',
    collection: 'session'
});
const app = express();

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(require('express-session')({
    secret: secret_key,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        httpOnly: true
    },
    store: store,
    resave: true,
    saveUninitialized: true,

}));
app.use(flash())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(passport.initialize());
app.use(passport.session());

app.listen(port, host);
InitServer()
authRoute(app)
dialogRoute(app)
userRoute(app)
console.log(`starting server on http://${host}:${port}`);