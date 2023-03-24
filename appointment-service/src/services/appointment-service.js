const AppointmentRepository = require("../database/repository/appointment-repository")


class AppointmentService {
    constructor() {
        this.repository = new AppointmentRepository()
    }

    async createAppointment({ ownerId, vetId, date}) {
       return await this.repository.createAppointment({ ownerId, vetId, date })
    }

    async getOwnerAppointments(id) {
        return await this.repository.getOwnerAppointment(id)
    }

    async getVetAppointments(id) {
        return await this.repository.getVetAppointment(id)
    }
}

module.exports = AppointmentService