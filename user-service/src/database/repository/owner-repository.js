const Owner = require("../models/Owner")


class OwnerRepository {

    async RegisterUser ({firstName, lastName, email, hashedPassword}) {
      
        const newUser = new Owner({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })

        
        return await newUser.save()
    }

    async getOwnerByEmail(email) {
        return await Owner.findOne({ email })
    }

    async getOwnerById(id) {
        return await Owner.findById(id)
    }
    
} 

module.exports = OwnerRepository;