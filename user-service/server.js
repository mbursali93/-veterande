const express = require("express")
const mongoose = require("mongoose")
const doteenv = require("dotenv").config()

const ClientRouter = require("./src/routes/client")

const app = express()
app.use(express.json())

//ROUTES

app.use("/client/auth", ClientRouter)


mongoose.connect(process.env.MONGO_URL).then(
    ()=> console.log("database connection is successful")
).catch(
    (e)=> console.log(e.message)
)



const PORT = process.env.PORT || 4001
app.listen(PORT, ()=> console.log(`User service is running on PORT: ${PORT}`))
