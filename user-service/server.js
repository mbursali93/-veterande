const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const cookieParser = require("cookie-parser")

const ClientRouter = require("./src/routes/client-route")

const app = express()


app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))

//ROUTES

app.use("/client/auth", ClientRouter)


mongoose.connect(process.env.MONGO_URL).then(
    ()=> console.log("database connection is successful")
).catch(
    (e)=> console.log(e.message)
)



const PORT = process.env.PORT || 4001
app.listen(PORT, ()=> console.log(`User service is running on PORT: ${PORT}`))
