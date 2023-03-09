const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../utils/index")
const ClientService = require("../services/client-service")

const service = new ClientService()
class ClientController {
    
   async register(req,res) {
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
   }

   async login (req,res) {
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

   async getClient (req,res) {
    try {
        const id = req.params.id
        const user = await service.getClient(id)
        
        res.status(200).json(user._doc)


    } catch(e) {
        res.status(500).json(e.message)
    }
   }
}

module.exports = ClientController;