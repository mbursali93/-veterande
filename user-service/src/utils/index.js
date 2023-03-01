const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports.hashPassword = async (password) => {
    return await bcrypt.hash(password, 10)
} 

module.exports.generateSignature = async (payload) => {
    try {
       return await jwt.sign(payload, "secret", { expiresIn: "15m"})
    } catch(e) {
        console.log(e)
        return e;
    }
}