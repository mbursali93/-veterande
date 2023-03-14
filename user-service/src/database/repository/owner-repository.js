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

    async updateOwner({ id, firstName, lastName, password }) {
        return await Owner.findByIdAndUpdate(id, {
            $set: {
                _id:id,
                firstName,
                lastName,
                password
            }
        }, { new: true })
    }

    async updateOwnedAnimals({ id, animals }) {
        return await Owner.findOneAndUpdate({_id: id }, {
            animals,
        }, { new:true })
    }
    
} 

module.exports = OwnerRepository;