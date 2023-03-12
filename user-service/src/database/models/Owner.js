const mongoose = require("mongoose")

const OwnerSchema = new mongoose.Schema({

    firstName: { type:String, required: true },
    lastName: { type: String, required: true },
    email: { type:String, required:true, unique:true },
    password: { type:String, required:true },
    animals: { type: Array }

}, {timestamps: true })

module.exports = mongoose.model("Owners", OwnerSchema)