const router = require("express").Router()
const AuthController = require("../controllers/authController")


const auth = new AuthController()


//FOR OWNERS

router.post("/register-owner", auth.registerOwner)
router.post("/login-owner", auth.loginOwner)


//FOR VETS
router.post("/register-vet", auth.registerVet)
router.post("/login-vet", auth.loginVet)

//COMMON

router.post("/logout", auth.logout)
router.post("/refresh", auth.refreshToken)



module.exports = router;