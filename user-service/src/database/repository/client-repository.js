const Client = require("../models/Client")


class ClientRepository {

    async RegisterUser ({name, surname, email, hashedPassword}) {
      
        const newUser = new Client({
            name,
            surname,
            email,
            password: hashedPassword
        })

        return await newUser.save()
    }

    async getClientByEmail(email) {
        return await Client.findOne({ email })
    }

    async getClientById(id) {
        return await Client.findById(id)
    }
    
} 

module.exports = ClientRepository;