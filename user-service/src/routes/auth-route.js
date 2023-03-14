const router = require("express").Router()
const AuthController = require("../controllers/authController")


const auth = new AuthController()


//FOR OWNERS

router.post("/register-owner", auth.registerOwner)
router.post("/login-owner", auth.loginOwner)
router.post("/logout", auth.logout)
router.post("/refresh", auth.refreshToken)

//FOR VETS





module.exports = router;