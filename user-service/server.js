const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const cookieParser = require("cookie-parser")

const authRouter = require("./src/routes/auth-route")
const ownerRouter = require("./src/routes/owner-route")
const vetRouter = require("./src/routes/vet-route")

const app = express()


app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))

//ROUTES

app.use("/auth", authRouter)
app.use("/owners", ownerRouter)
app.use("/vets", vetRouter)


mongoose.connect(process.env.MONGO_URL).then(
    ()=> console.log("database connection is successfull")
).catch(
    (e)=> console.log(e.message)
)



const PORT = process.env.PORT || 4001
app.listen(0, ()=> console.log(`User service is running on PORT: ${PORT}`))


module.exports = app
