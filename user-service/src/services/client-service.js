const ClientRepository = require("../database/repository/client-repository")
const { hashPassword, generateSignature } = require("../utils/index")

class ClientService {
    constructor() {
        this.repository = new ClientRepository()
    }

    async Register(userInputs) {
        const {name, surname, email, password} = userInputs
        const hashedPassord = await hashPassword(password)
        const newUser = await this.repository.RegisterUser({name, surname, email, password:hashedPassord})
       const token = await generateSignature({id: newUser._id})
        console.log(token)
        return newUser;
    }

}

module.exports = ClientService;