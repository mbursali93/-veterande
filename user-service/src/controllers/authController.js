const OwnerService = require("../services/owner-service")
const VetService = require("../services/vet-service")
const { getNewToken, generateAccessToken, generateRefreshToken, setCookies } = require("../utils/index")

const owner = new OwnerService()
const vet = new VetService()


class AuthController {
    async registerOwner(req,res) {
        try {
            const newUser = await owner.Register(req.body)
            const { password, ...others } = newUser._doc
            
            const token = await generateAccessToken({ id: newUser._id }) 
            const refresh = await generateRefreshToken({ id: newUser._id })
           
            setCookies(res, refresh)
            
            
    
            res.status(200).json({...others, token})
        } catch(e) {
            
            res.status(500).json(e.message)
        
        }
    }

    async loginOwner(req,res) {
        
        try {
           const theOwner = await owner.Login(req.body)
           const { password, ...others } = theOwner._doc
          
           
           const token = await generateAccessToken({id: theOwner._id})
           const refresh = await generateRefreshToken({id: theOwner._id})
    
           setCookies(res, refresh)
    
           res.status(200).json({...others, token})
    
        } catch(e) {
            
            res.status(500).json(e.message)
        }
    }

    async registerVet (req,res) {
        try {
            const theVet = await vet.registerUser(req.body)
            const { password, ...others } = theVet._doc

            
            const token = await generateAccessToken({ id: theVet._id })
            const refresh = await generateRefreshToken({ id: theVet._id })
            setCookies(res, refresh)

            res.status(200).json({...others, token})

        } catch(e) {
            res.status(500).json(e.message)
        }
    }

    async loginVet (req,res) {
        try {
            const user = await vet.loginUser(req.body)
            const { password, ...others } = user._doc

            const token = await generateAccessToken({ id: user._id })
            const refresh = await generateRefreshToken({ id: user._id })

            setCookies(res, refresh)
            res.status(200).json({ ...others, token })

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
            const token = await getNewToken(refreshToken)
            
            res.status(200).json({token})
            
            
    
        }catch(e) {
            res.status(500).json(e.message)
        }
       }
}

module.exports = AuthController