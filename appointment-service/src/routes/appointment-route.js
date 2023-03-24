const router = require("express").Router()
const AppointmentController = require("../controller/appointment-controller")
const { verifyUser } = require("../middlewares/verifyUser")

const appointment = new AppointmentController()

router.get("/owner/:id", appointment.getOwnerAppointments )
router.get("/vet/:id", appointment.getVetAppointments ) // Pagination required for this  
router.post("/", verifyUser, appointment.createAppointment)


module.exports = router;