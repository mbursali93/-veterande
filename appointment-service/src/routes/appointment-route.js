const router = require("express").Router()
const AppointmentController = require("../controller/appointment-controller")

const appointment = new AppointmentController()


router.post("/", appointment.createAppointment)


module.exports = router;