const { convertDateToLocalTime, noMoreThanAMonth, betweenWorkingHours, minutesValidityCheck } = require("../utils/index")
const AppointmentService = require("../services/appointment-service")
const MessageQueue = require("../utils/message-queue")

const service = new AppointmentService()
const message = new MessageQueue()

class AppointmentController {
    
    async createAppointment (req,res) {
        try {
            const { ownerId, vetId, date, time } = req.body
            const currentDate = new Date()

            const appointmentDate = convertDateToLocalTime(date, time)
            const currentLocalDate = convertDateToLocalTime(currentDate)

            const workingHours =  betweenWorkingHours(appointmentDate)
            const timeBetweenIsValid = noMoreThanAMonth(appointmentDate, currentLocalDate)
            const areMinutesValid = minutesValidityCheck(appointmentDate)

            if(currentLocalDate > appointmentDate) return res.status(500).json("You cant get appointment for past time")
            if(!timeBetweenIsValid) return res.status(500).json("Difference between appointments is more than 30 days")
            if(!workingHours) return res.status(500).json("Time you choose should be between working hours")
            if(!areMinutesValid) return res.status(500).json("You cant choose that time")

           
           
            const appointment = await service.createAppointment({ ownerId, vetId, date: appointmentDate })
            await message.sendMessage(vetId)
           
            res.status(200).json(appointment)


        }catch(e) {
            res.status(500).json(e.message)
        }
    }

    async getOwnerAppointments (req,res) {
        try {
            const id = req.params.id;

            const appointments = await service.getOwnerAppointments(id)

            res.status(200).json(appointments)
        } catch(e) {
            res.status(500).json(e.message)
        }
    }

    async getVetAppointments (req,res) {
        try {

            const id = req.params.id;

            const appointments = await service.getVetAppointments(id)
            
            res.status(200).json(appointments)
            

        } catch(e) {

            res.status(500).json(e.message)
        }
    }

    
}

module.exports = AppointmentController;