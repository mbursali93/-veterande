const router = require("express").Router()
const ClientController = require("../controllers/clientController")


const client = new ClientController()


//AUTH

router.post("/register", client.register)
router.post("/login", client.login)
router.post("/logout", client.logout)
router.post("/refresh", client.refreshToken)



module.exports = router;