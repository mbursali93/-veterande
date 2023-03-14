const router = require("express").Router()
const OwnerController = require("../controllers/ownerController")
const { verifyOwner } = require("../middlewares/verifyOwner")

const owner = new OwnerController()

router.get("/:id", owner.getOwnerById)
router.put("/:id", verifyOwner, owner.changeCredentials)
router.patch("/:id", verifyOwner, owner.handleOwnedAnimals)




module.exports = router;