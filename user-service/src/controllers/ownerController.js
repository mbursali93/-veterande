const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../utils/index")
const OwnerService = require("../services/owner-service")

const service = new OwnerService()
class OwnerController {
    
   async register(req,res) {
    try {
        const { firstName, lastName, email, password } = req.body
        const userInputs = {
            firstName,
            lastName,
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
   }

   async login (req,res) {
    try {
        const { email, password } = req.body

        const userInputs = {
            email,
            password
        }
       const owner = await service.Login(userInputs)
       
       const token = await generateAccessToken({id: owner._id})
       const refresh = await generateRefreshToken({id: owner._id})

       res.cookie("refreshToken", refresh, {
        path:"/",
        httpOnly: true,
        maxAge: 1000*60*60*24*7 // 7 days

       })

       res.status(200).json({...owner._doc, token})

    } catch(e) {
        
        res.status(500).json(e.message)
    }
   }

   async logout (req,res) {
    try {
        res.clearCookie("refreshToken", {path:"/"})
        res.status(200).json("Logged Out")
    }catch(e) {
        res.status(500).json(e.message)
    }
   }

   async refreshToken (req,res) {
    try {
        const refreshToken = req.cookies.refreshToken
        const token = await verifyRefreshToken(refreshToken)
        
        res.status(200).json({token})
        
        

    }catch(e) {
        res.status(500).json(e.message)
    }
   }

   
}

module.exports = OwnerController;