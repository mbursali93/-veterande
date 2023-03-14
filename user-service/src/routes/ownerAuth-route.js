const router = require("express").Router()
const OwnerController = require("../controllers/ownerController")


const owner = new OwnerController()




router.post("/register", owner.register)
router.post("/login", owner.login)
router.post("/logout", owner.logout)
router.post("/refresh", owner.refreshToken)



module.exports = router;