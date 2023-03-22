const { convertDateToLocalTime, noMoreThanAMonth } = require("../utils/index")
const AppointmentService = require("../services/appointment-service")

const service = new AppointmentService()

class AppointmentController {

    async createAppointment (req,res) {
        try {
            const { ownerId, vetId, date, time } = req.body
            const currentDate = new Date()

            const appointmentDate = convertDateToLocalTime(date, time)
            const currentLocalDate = convertDateToLocalTime(currentDate)

            const timeBetweenIsValid = noMoreThanAMonth(appointmentDate, currentLocalDate)

            if(currentLocalDate > appointmentDate) return res.status(500).json("You get get appointment for past time")
            if(!timeBetweenIsValid) return res.status(500).json("Difference between appointments is more than 30 days")

           const appointment = await service.createAppointment({ ownerId, vetId, date: appointmentDate })
           

            res.status(200).json(appointment)


        }catch(e) {
            res.status(500).json(e.message)
        }
    }
}

module.exports = AppointmentController;