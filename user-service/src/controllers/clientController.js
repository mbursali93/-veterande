const { generateAccessToken, generateRefreshToken } = require("../utils/index")
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
        const refresh = req.cookies.refreshToken
        jwt.verify(refresh, process.env.JWT_REFRESH, (err,user) => {
            if(err) res.status(500).json("Verification Failed!")

            const accessToken = jwt.sign({
                id: user.id,
                isAdmin: user.isAdmin
            }, process.env.JWT_ACCESS, {expiresIn:"11m"})

            res.status(200).json(accessToken)
        })
        
        

    }catch(e) {
        res.status(500).json(e.message)
    }
   }
}

module.exports = ClientController;