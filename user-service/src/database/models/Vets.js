const mongoose = require("mongoose")

const vetsSchema = new mongoose.Schema({
    name: { type: String, required:true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required:true },
    services: { type: Array, required: true},
    location: {
        latitude: { type:Number, required: true},
        longtitude: { type:Number, required: true},

    },
    address: { type: String, required:true },

    comments: [
        {
            senderInfo: { type: String },
            text: { type: String },
            rating: { type: Number }
        }
    ],
    totalAppointments: { type:Number, default:0 }
    


}, { timestamps: true })

module.exports = mongoose.model("vets", vetsSchema )






