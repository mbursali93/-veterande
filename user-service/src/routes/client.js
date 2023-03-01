const router = require("express").Router()
const ClientService = require("../services/client-service")


const service = new ClientService()

router.post("/register", async(req,res) => {
    try {
        const { name, surname, email, password } = req.body
        const savedUser = await service.Register({ name, surname, email, password })
        res.status(200).json(savedUser)

    } catch(e) {
        
        res.status(500).json(e.message)
    }
})

module.exports = router;