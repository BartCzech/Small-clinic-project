var express = require('express');
var cors = require('cors');
var dotenv = require('dotenv');
var cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const patientsRouter = require("./routes/patients");


const app = express();
dotenv.config();
connectDB();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/patients", patientsRouter);

app.get("/getdata", (req, res) => {
    res.send("help");
});

app.listen(5000, () => console.log("Hospital is open"));