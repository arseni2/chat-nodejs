require('dotenv').config()
import { userRoute } from "./routes/user/user.route";
import { dialogRoute } from "./routes/dialog/dialog.route";
import { authRoute } from "./routes/auth/auth.route";
import { InitDataBase } from "./core/db";
import express = require("express");
import { messagesRoute } from "./routes/messages/messages.route";
import { createSocket } from "./core/socket";
import { InitServer } from "./core/init_server";


//TODO:
//MORE:
//1. поправить типизацию с user in req вынести в декларатион файл
//3. сделать так чтобы нельза с одним partner создать несколько диалогов
//4. сделать поиск диалогов mongoose-fuzzy-searching, https://bit.ly/30Ic3LA
//5. написать last_seen на сокетах (socket_io)
//ADVICE(советы):
//1. писать код смотря в заметку по chatapp, чистый код
//2. глядеть в заметку chatapp



const app = express();
const server = InitServer(app)
const io = createSocket(server) 
InitDataBase()
authRoute(app)
dialogRoute(app)
userRoute(app)
messagesRoute(io, app)


