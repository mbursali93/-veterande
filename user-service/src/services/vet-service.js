const { hashPassword, comparePasswords } = require("../utils/index")
const VetRepository = require("../database/repository/vet-repository")

class VetService {
    constructor() {
        this.repository = new VetRepository()
    }
    async registerUser (userInputs) {

        const { name, email, password, services, latitude, longtitude, address } = userInputs
        const hashedPassword = await hashPassword(password)
        const newUser = await this.repository.createUser({ name, email, password: hashedPassword, services, latitude, longtitude, address })
        return newUser;

    }

    async loginUser ( userInputs ) {
        const { name, password } = userInputs
        const user = await this.repository.getVetByName(name)
        if(!user) throw new Error("no user to be found")
        const isPasswordCorrect = await comparePasswords(password, user.password)
        if(!isPasswordCorrect) return new Error("password is incorrect")

        return user;
    }

    async getVetById(id) {
        const user = await this.repository.getVetById(id)
        if(!user) return new Error("No user to be found")
        return user;
    }

    async updateVetServices(userInputs) {
        const { id, services } = userInputs;
        const user = await this.repository.updateVetServices({ id, services })
        return user;
    }

    async deleteVet(id) {
        await this.repository.deleteVet(id)
    }
}

module.exports = VetService;