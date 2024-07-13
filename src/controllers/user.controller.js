import { UserModel } from "../models/user.model.js";

export default class UserController{
    getRegister(req, res){
        res.render('register')
    }
}