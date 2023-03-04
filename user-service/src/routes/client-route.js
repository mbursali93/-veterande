const router = require("express").Router()
const ClientService = require("../services/client-service")
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../utils/index")


const service = new ClientService()


//REGISTER

router.post("/register", async (req, res)=> {
    try {
        const { name, surname, email, password } = req.body
        const userInputs = {
            name,
            surname,
            email,
            password
        }

        const newUser = await service.Register(userInputs)

        const token = await generateAccessToken({
            id: newUser._id
        }) 

        const refresh = await generateRefreshToken({
            id: newUser._id
        })
       
        res.cookie("refreshToken", refresh, {
            httpOnly: true,
            path:"/",
            maxAge: 1000*60*60*24*7 // 7 days
        })
        
        
        res.status(200).json({...newUser._doc, token})
    } catch(e) {
        
        res.status(500).json(e.message)
    
    }
    
})

//LOGIN 

router.post("/login", async (req,res)=> {
    try {
        const { email, password } = req.body
        const userInputs = {
            email,
            password
        }
       const client = await service.Login(userInputs)
       
       const token = await generateAccessToken({id: client._id})
       const refresh = await generateRefreshToken({id: client._id})

       res.cookie("refreshToken", refresh, {
        path:"/",
        httpOnly: true,
        maxAge: 1000*60*60*24*7 // 7 days

       })

       res.status(200).json({...client._doc, token})

    } catch(e) {
        
        res.status(500).json(e.message)
    }
})

//LOGOUT

router.post("/logout", async (req,res)=> {
    try {
        res.clearCookie("refreshToken", {path:"/"})
        res.status(200).json("Logged Out")
    }catch(e) {
        res.status(500).json(e.message)
    }
})


//REFRESH TOKEN

router.get("/refresh", async(req,res)=> {
    try {
        const refresh = req.cookies.refreshToken
        
        
        console.log(token)

    }catch(e) {
        res.status(500).json(e.message)
    }
})

module.exports = router;