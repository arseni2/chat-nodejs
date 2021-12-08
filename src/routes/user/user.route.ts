import { Express } from "express";
import { isAuthProtect } from "../../middleware/passport/middleware";
import { userSearch } from "../../views/userViews/views";


export const userRoute = (app: Express) => {
    app.get('/user/search', isAuthProtect, userSearch)
}
