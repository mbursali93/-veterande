const router = require("express").Router()
const VetController = require("../controllers/vetController")
const { verifyUser } = require("../middlewares/verifyUser")

const vet = new VetController()

router.get("/:id", vet.getVetById)

router.patch("/:id", verifyUser, vet.updateVetServices)
router.delete("/:id", verifyUser, vet.deleteVet)





module.exports = router;