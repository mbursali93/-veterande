const { generateAccessToken, generateRefreshToken, verifyRefreshToken, getNewToken } = require("../utils/index")
const OwnerService = require("../services/owner-service")

const service = new OwnerService()
class OwnerController {
    
   async getOwnerById(req,res) {
    try {
        const id = req.params.id
        const user = await service.getOwnerById(id);
        const { password, ...others } = user._doc
        res.status(200).json({...others})

    } catch(e) {
        res.status(500).json(e.message)
    }
   }

   async changeCredentials (req,res) {
    try {
        const { firstName, lastName, password, verifyPassword } = req.body
        const id = req.params.id

        if(password !== verifyPassword ) throw new Error("Passwords do not match")

        await service.updateOwnerCredentials({ id, firstName, lastName, password})
    
        res.status(200).json("password has changed")

    }catch(e) {

        res.status(500).json(e.message)
    }
   }

   async handleOwnedAnimals (req,res) {
    try {
        const id = req.params.id
        const animals = req.body.animals
        const updatedUser = await service.updateOwnedAnimals({ id, animals })
        res.status(200).json(updatedUser.animals)

    } catch(e) {
        res.status(500).json(e.message)
    }
   }

   
}

module.exports = OwnerController;