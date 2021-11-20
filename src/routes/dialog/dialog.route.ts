import {Express} from "express";
import {isAuthProtect} from "../../middleware/passport/middleware";
import {dialogAll, dialogCreate, dialogSearch} from "../../views/dialogViews/views";
import {userModelInterface} from "../../models/user/user";

declare global {
    namespace Express {
        interface User extends userModelInterface {

        }
    }
}
export const dialogRoute = (app: Express) => {
    app.post('/dialog/create', isAuthProtect, dialogCreate)
    app.get('/dialog/all', isAuthProtect, dialogAll)
    app.get('/dialog/search', isAuthProtect, dialogSearch)
}