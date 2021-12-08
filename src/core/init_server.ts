import { Express } from 'express';
import { host, port, secret_key } from "../config";
import { updateLastSeen } from "../middleware/passport/middleware";
import express = require('express');
import flash = require('express-flash');
import passport = require("passport");
import http from 'http'
const cors = require('cors');
import session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);


export const InitServer = (app: Express): http.Server => {
    const store = new MongoDBStore({
        uri: 'mongodb://localhost:27017/session',
        collection: 'session'
    });
    const corsOptions = {
        origin: 'http://localhost:3000',
        credentials: true,
        optionSuccessStatus: 200
    }
    app.use(cors(corsOptions));
    app.use('/uploads', express.static(__dirname + '/public'));
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
    app.use(updateLastSeen)
    let server = app.listen(port, function() {
        console.log('server listening at', port, host)
    })
    return server
}