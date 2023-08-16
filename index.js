const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv").config();
var router = require("./routers/api");
const port = dotenv.parsed.PORT || 3000;
const multer = require("multer");
var http = require("http");
const cors = require("cors");
const app = express();

app.use(express.json());
// app.use(express.static("uploads/videos"));
// app.use(express.static("uploads/images"));
// app.use(
//   cors({
//     origin: ["http://localhost:1234", "http://192.168.10.26:4173"],
//     credentials: true,
//     exposedHeaders: ["Access-Control-Allow-Origin"],
//     allowedHeaders: ["Content-Type", "Origin", "User-Agent", "authorization"],
//     methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
//     maxAge: 86400,
//   })
// );
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

// const server = http.createServer(app);

// require("./src/socket/socket")(server);

app.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}`);
});
