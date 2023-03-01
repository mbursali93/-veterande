const Client = require("../models/Client")


class ClientRepository {

    async RegisterUser ({name, surname, email, password}) {
      
        const newUser = new Client({
            name,
            surname,
            email,
            password,
        })

        return await newUser.save()
    }
} 

module.exports = ClientRepository;