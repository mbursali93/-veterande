const mongoose = require("mongoose")

const ClientSchema = new mongoose.Schema({
    name: {type: String, required:true},
    surname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

module.exports = mongoose.model("clients", ClientSchema)