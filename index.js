const express = require("express");
const mongoose = require("./connect");
const dotenv = require("dotenv");

const registerRouter = require("./router/register");
const userRouter = require("./router/userRouter");

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect();

app.use("/register", registerRouter);
app.use("/users", userRouter);

app.listen(3001);
