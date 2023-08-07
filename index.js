const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv").config();
var router = require("./routers/api");
const port = dotenv.parsed.PORT || 3000;
const multer = require("multer");
var http = require("http");

const app = express();

app.use(express.json());
// app.use(express.static("uploads/videos"));
// app.use(express.static("uploads/images"));
app.use(router);

// const server = http.createServer(app);

// require("./src/socket/socket")(server);

app.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}`);
});
