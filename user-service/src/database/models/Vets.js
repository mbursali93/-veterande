const mongoose = require("mongoose")

const vetsSchema = new mongoose.Schema({
    name: { type: String, required:true, unique:true },
    email: { type: String, required: true, unique:true },
    password: { type: String, required:true },
    services: { type: Array, required: true},
    vets: [
        {
            name: {type:String, required: true},

        }
    ],
    location: {
        latitute: { type:Number, required: true},
        longtitute: { type:Number, required: true},

    },
    address: { type: String, required:true },

    comments: [
        {
            senderInfo: { type: String, required: true},
            text: { type: String },
            rating: { type: Number }
        }
    ],
    


}, { timestamps: true })

module.exports = mongoose.model("vets", vetsSchema )






