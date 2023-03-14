const mongoose = require("mongoose")

const OwnerSchema = new mongoose.Schema({

    firstName: { type:String, required: true },
    lastName: { type: String, required: true },
    email: { type:String, required:true, unique:true },
    password: { type:String, required:true },
    animals: [
        {
            name: { type: String },
            specie: { type:String },
            breed: { type:String },
            sex: { type:String },
            age: { type: Number },
        }
    ]

}, {timestamps: true })

module.exports = mongoose.model("Owners", OwnerSchema)