const express = require("express");
const mongoosedb = require(`./db/mongoose`);
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const app = require("./app");

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Server is Running on port " + port);
});
