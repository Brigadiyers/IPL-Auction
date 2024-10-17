const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const socketio = require("socket.io");
const http = require("http");
const userRouter = require("./routes/user.route");
const newsRouter = require("./routes/news.route");
const auctionRouter = require("./routes/auction.route");
const path = require("path");
require("dotenv").config();
require("./database/connection");

const app = express();
const server = http.createServer(app);

// CORS origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://brigadiers.tech"
];

// Socket.IO configuration
const io = socketio(server, {
  cors: {
    origin: allowedOrigins, // Allow requests from both origins
    credentials: true,
  },
});

// Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins, // Allow requests from both origins
    credentials: true,
  })
);

app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use(userRouter);
app.use(newsRouter);
app.use(auctionRouter);

require("./routes/socket.route")(io);

server.listen(process.env.PORT || 8000, () => {
  console.log("Listening on port 8000");
});