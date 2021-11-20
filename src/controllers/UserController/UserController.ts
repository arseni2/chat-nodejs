import {userType} from "./UserControllerTypes";
import {UserModel} from "../../models/user/user";
import bcrypt from "bcrypt";

class UserController {
    constructor() {

    }
    async createUser(obj: userType) {
        let user = new UserModel({...obj})
        user.password = bcrypt.hashSync(obj.password, 10)
        await user.save()
        return user
    }
}

export const UserControllerInstanse = new UserController()