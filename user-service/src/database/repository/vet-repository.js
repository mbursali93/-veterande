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

    async updateVetTotalAppointment(id) {
        const vet = await this.getVetById(id)
        let vetAppointments = vet.totalAppointments
        
       await Vet.findOneAndUpdate({_id:id}, {
            totalAppointments: vetAppointments + 1
        }, { new:true })
    }
}


module.exports = VetRepository;