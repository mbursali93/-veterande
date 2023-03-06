const router = require("express").Router()
const ClientService = require("../services/client-service")
const ClientController = require("../controllers/clientController")


const client = new ClientController()


//AUTH

router.post("/register", client.register)
router.post("/login", client.login)
router.post("/logout", client.logout)
router.get("/refresh", client.refreshToken)



module.exports = router;