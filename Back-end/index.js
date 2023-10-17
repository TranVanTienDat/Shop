const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./dataBase/connection");
const route = require("./routes/index");
const http = require("http");
const cors = require("cors");
dotenv.config({ path: ".env" });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(cors());

app.use("/api", route);
app.get("/", (req, res) => {
  res.status(200).send("success");
});

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Connect db
connectDB();

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
