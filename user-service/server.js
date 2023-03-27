const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const MessageQueue = require("./src/utils/message-queue");
const authRouter = require("./src/routes/auth-route");
const ownerRouter = require("./src/routes/owner-route");
const vetRouter = require("./src/routes/vet-route");

const app = express();

// Configurations
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({
    credentials: true,
    origin: [process.env.USER_LINK, process.env.FRONT_LINK]
}));

// Routes
app.use("/auth", authRouter);
app.use("/owners", ownerRouter);
app.use("/vets", vetRouter);

// Database Connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("database connection is successful");
        app.emit('database-connected');
    })
    .catch((e) => {
        console.log(e.message);
        process.exit(1);
    });

// RabbitMQ
const messageBroker = new MessageQueue();
messageBroker.handleMessages();

app.on('database-connected', () => {
    const PORT = process.env.PORT || 4001;
    app.listen(PORT, () => {
        console.log(`User service is running on PORT: ${PORT}`);
    });
});

module.exports = app