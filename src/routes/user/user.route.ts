import {Express} from "express";
import {isAuthProtect} from "../../middleware/passport/middleware";
import {userPagination, userSearch} from "../../views/userViews/views";


export const userRoute = (app: Express) => {
    app.get('/user/all', isAuthProtect, userPagination)
    app.get('/user/search', isAuthProtect, userSearch)
}
