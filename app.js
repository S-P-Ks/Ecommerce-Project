const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./Routes/auth");
const userRoute = require("./Routes/user");
const categoryRoute = require("./Routes/category");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { json, urlencoded } = require("body-parser");

require("dotenv").config();

// App
const app = express();

app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

// Application Routes
app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", categoryRoute);

app.get("/hello", (req, res) => {
  console.log("reqrqe");
  return res.send("Hello World");
});

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
