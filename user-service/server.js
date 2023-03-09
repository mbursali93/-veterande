const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const cookieParser = require("cookie-parser")

const AuthRouter = require("./src/routes/auth-route")

const app = express()


app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))

//ROUTES

app.use("/auth", AuthRouter)


mongoose.connect(process.env.MONGO_URL).then(
    ()=> console.log("database connection is successful")
).catch(
    (e)=> console.log(e.message)
)



const PORT = process.env.PORT || 4001
app.listen(PORT, ()=> console.log(`User service is running on PORT: ${PORT}`))


module.exports = app
