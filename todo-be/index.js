const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const todoItemsRoute = require("./routes/todoItems");

const app = express();

app.use(express.json());
app.use(cors({

    origin: ["http://localhost:3000", "https://todo-5o0o.onrender.com"],
}
));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://todo-5o0o.onrender.com');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
dotenv.config();
const PORT = process.env.PORT || 8000;

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err))

app.use("/v1/api", todoItemsRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});