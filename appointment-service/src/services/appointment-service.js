const AppointmentRepository = require("../database/repository/appointment-repository")


class AppointmentService {
    constructor() {
        this.repository = new AppointmentRepository()
    }
    async createAppointment({ ownerId, vetId, date}) {
       return await this.repository.createAppointment({ ownerId, vetId, date })
    }
}

module.exports = AppointmentService