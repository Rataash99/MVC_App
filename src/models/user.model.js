export class UserModel{
    constructor(_id, _name, _email, _password){
        this.id = _id;
        this.name = _name;
        this.email = _email;
        this.password = _password;
    }
    static add(name, email, password){
        const user = new UserModel(
            users.length + 1,
            name,
            email,
            password
        )
        users.push(user);
    }
    static isValidUser(email, password){
        const result = users.find((user) => {
            return user.email == email && user.password == password;
        });
        return result;
    }
}
const users = [];