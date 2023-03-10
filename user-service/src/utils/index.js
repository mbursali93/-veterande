const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports.hashPassword = async (password) => {
    return await bcrypt.hash(password, 10)
} 

module.exports.generateAccessToken = async (payload) => {
    try {
       return await jwt.sign(payload, process.env.JWT_ACCESS, { expiresIn: "11m"})
    } catch(e) {
        
        return e;
    }
}

module.exports.generateRefreshToken = async (payload) => {
    try {
        

       return await jwt.sign(payload, process.env.JWT_REFRESH, { expiresIn: "7d"})
    } catch(e) {
        
        return e;
    }
}

module.exports.verifyRefreshToken = async(token) => {
    return await jwt.verify(token, process.env.JWT_REFRESH, async (err, user)=> {
        if(err) console.log(err)
       const token = await this.generateAccessToken({ id: user._id})
       return token;
    })
}

module.exports.comparePasswords = async (inputPassword, clientPassword)=> {
    const hashedInputPassword = await bcrypt.hash(inputPassword, 10)
    const isSame = await bcrypt.compare(inputPassword, clientPassword)
    
    
    if(isSame) return true;
    throw new Error("Password is not correct")
}



