const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const cors = require("cors")



const app = express()
app.use(express.json())



app.use(cors({
    credentials: true,
    origin: [process.env.APPOINTMENT_LINK, process.env.FRONT_LINK],
    
}))

const appointmentRouter = require("./src/routes/appointment-route")



app.use("/appointment", appointmentRouter)


//DATABASE CONNECTION

mongoose.connect(process.env.MONGO_URL)
.then(
    ()=>{
        console.log("database connection is successful")
        app.emit("database-connection")
    })
.catch((e)=> {
    console.log(e.message)
    process.exit(1)
})


app.on("database-connection", ()=> {
    const PORT = process.env.PORT || 4002
    app.listen(4002, ()=> console.log(`Appointment service is running on PORT: ${PORT}`))
})

module.exports = app;