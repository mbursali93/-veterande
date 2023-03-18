const Vet = require("../models/Vets")


class VetRepository {
    async createUser({ name, email, password, services, latitude, longtitude, address }) {
        const newUser = new Vet({
            name,
            email,
            password,
            services,
            location: {
                latitude,
                longtitude
            },
            address
            
        })

       return await newUser.save()
    }

    async getVetByName (name) {
        return await Vet.findOne({ name })
    }

    async getVetById(id) {
        return await Vet.findById(id)
    }

    async updateVetServices({ id, services }) {
       return await Vet.findByIdAndUpdate({ _id:id }, {
            services,
        }, { new:true })
    }

    async deleteVet(id) {
        await Vet.findByIdAndDelete(id)
    }
}


module.exports = VetRepository;