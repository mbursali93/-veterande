const { verifyAccessToken } = require("../utils")


module.exports.verifyOwner = async (req,res,next)=> {
    
    try {
        const token = req.header("Authorization")
    if(!token) return res.status(500).json("No token to be found")
    const verifiedUser = await verifyAccessToken(token)
    if(req.params.id !== verifiedUser.id) return res.status(500).json("You are not allowed to do that")

    next()
    } catch(e) {
        res.status(500).json(e.message)
    }
}


