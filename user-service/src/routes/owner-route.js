const router = require("express").Router()
const OwnerController = require("../controllers/ownerController")
const { verifyUser } = require("../middlewares/verifyUser")

const owner = new OwnerController()

router.get("/:id", owner.getOwnerById)
router.put("/:id", verifyUser, owner.changeCredentials)
router.patch("/:id", verifyUser, owner.handleOwnedAnimals)




module.exports = router;