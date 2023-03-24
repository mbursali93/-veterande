const jwt = require("jsonwebtoken")
const { verifyAccessToken } = require("../utils/index")


module.exports.verifyUser = async (req,res,next) => {
    try {

        const token = req.header("Authorization")
        const verifiedUser = await verifyAccessToken(token)
        if( verifiedUser.id !== req.params.id ) return res.status(500).json("you are not allowed to do that")
        next() 

    } catch(e) {
        res.status(500).json(e.message)
    }
    
}

