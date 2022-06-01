const express = require("express");
const mongoose = require("./connect");
const dotenv = require("dotenv");
const cors = require("cors");

const registerRouter = require("./router/register");
const userRouter = require("./router/userRouter");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect();

app.use("/register", registerRouter);
app.use("/users", userRouter);

app.listen(process.env.PORT);
