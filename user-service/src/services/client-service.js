const ClientRepository = require("../database/repository/client-repository")
const { hashPassword, comparePasswords } = require("../utils/index")

class ClientService {
    constructor() {
        this.repository = new ClientRepository()
    }

    async Register(userInputs) {
        const {name, surname, email, password} = userInputs
        const hashedPassword = await hashPassword(password)
        
        const newUser = await this.repository.RegisterUser({name, surname, email, hashedPassword})
        return newUser;
    }

    async Login(userInputs) {
        const { email, password } = userInputs
        const user = await this.repository.getClientByEmail(email)
        const isPasswordCorrect = await comparePasswords(password, user.password)
        if(isPasswordCorrect) return user;
        
    }

}

module.exports = ClientService;