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

module.exports.getNewToken = async(token) => {
    return await jwt.verify(token, process.env.JWT_REFRESH, async (err, user)=> {
        if(err) console.log(err)
       const token = await this.generateAccessToken({ id: user._id})
       return token;
    })
}

module.exports.verifyAccessToken = async (token) => {
   return await jwt.verify(token, process.env.JWT_ACCESS, (err, user)=> {
        if(err) throw new Error(err.message)
        return user;
    })
}

module.exports.comparePasswords = async (inputPassword, clientPassword)=> {
    const isSame = await bcrypt.compare(inputPassword, clientPassword)
    
    
    if(isSame) return true;
    throw new Error("Password is not correct")
}



