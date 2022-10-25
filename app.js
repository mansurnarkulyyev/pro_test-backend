const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const authRouter = require("./routes/api/auth");

const techQuestionsRouter = require("./routes/api/techQuestions");
const theoryQuestionsRouter = require("./routes/api/theoryQuestions");

const materialsRouter = require("./routes/api/materials");

const userAvatarsRouter = require("./routes/api/userAvatar");

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

//app.use("/pages/users", authPages);

app.use("/api/users", authRouter);

app.use("/api/questions/tech", techQuestionsRouter);
app.use("/api/questions/theory", theoryQuestionsRouter);

app.use("/api/team", userAvatarsRouter);

app.use("/api/materials", materialsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});
app.use((err, req, res, next) => {
  res.status(err.status).json({ message: err.message });
});
app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).json({ message });
});

module.exports = app;
