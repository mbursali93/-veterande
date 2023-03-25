const router = require("express").Router()
const AppointmentController = require("../controller/appointment-controller")
const { verifyUser } = require("../middlewares/verifyUser")

const appointment = new AppointmentController()

router.get("/owner/:id", verifyUser, appointment.getOwnerAppointments )
router.post("/owner/:id", verifyUser, appointment.createAppointment)

router.get("/vet/:id", appointment.getVetAppointments ) // Pagination required for this  



module.exports = router;