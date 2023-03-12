const OwnerRepository = require("../database/repository/owner-repository")
const { hashPassword, comparePasswords } = require("../utils/index")

class OwnerService {
    constructor() {
        this.repository = new OwnerRepository()
    }

    async Register(userInputs) {
        const {firstName, lastName, email, password} = userInputs
        const hashedPassword = await hashPassword(password)
        
        const newUser = await this.repository.RegisterUser({firstName, lastName, email, hashedPassword})
        return newUser;
    }

    async Login(userInputs) {
        const { email, password } = userInputs
        const user = await this.repository.getOwnerByEmail(email)
        const isPasswordCorrect = await comparePasswords(password, user.password)
        if(!isPasswordCorrect) return "password incorrect";
        return user;
        
    }

   

}

module.exports = OwnerService;