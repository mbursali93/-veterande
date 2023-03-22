const mongoose = require("mongoose")

const appointmentSchema = new mongoose.Schema({
    
    ownerId: { type: String, required: true },
    vetId: { type: String, required: true },
    date: { type: Date, required: true, unique: true },
    

    
}, { timestamps: true })


module.exports = mongoose.model("appointment", appointmentSchema)