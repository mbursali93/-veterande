const Appointment = require("../models/Appointment")

class AppointmentRepository {
    async createAppointment (userInputs) {
        const newAppointment = await new Appointment(userInputs)
        return await newAppointment.save()
    }

    async getOwnerAppointment (id) {
        return await Appointment.find({ ownerId: id })
    }

    async getVetAppointment (id) {
        return await Appointment.find({ vetId: id })
    }
}

module.exports = AppointmentRepository;