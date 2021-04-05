const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./Routes/user");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { check, validationResult } = require("express-validator");
const { json, urlencoded } = require("body-parser");

require("dotenv").config();

// App
const app = express();

app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api", userRoute);
app.use(check, validationResult);

// Mongoos Connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to Mongo DB");
  });

const port = process.env.PORT;

app.listen(port);
