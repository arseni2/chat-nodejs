import {run} from "./core/elastic_search";

require('dotenv').config()
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
    //1. доделать диалоги (поиск диалогов)
        //1. сделать вывод lastMessage
    //2. отдавать пагинацией всех юзеров
    //3. сделать поиск юзеров
    //4. после написания всей логики провети рефакторинг (вынести некоторые данные в env, ...)
//MORE:
    //1. поправить типизацию с user in req вынести в декларатион файл
    //2. user.last_seen работает не корректно
    //3. сделать так чтобы нельза с одним partner создать несколько диалогов
//ADVICE(советы):
    //1. писать код смотря в заметку по chatapp, чистый код


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
run()

app.listen(port, host);
InitServer()
authRoute(app)
dialogRoute(app)
console.log(`starting server on http://${host}:${port}`);