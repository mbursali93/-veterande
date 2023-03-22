const Appointment = require("../models/Appointment")

class AppointmentRepository {
    async createAppointment (userInputs) {
        const newAppointment = await new Appointment(userInputs)
        return await newAppointment.save()
    }
}

module.exports = AppointmentRepository;