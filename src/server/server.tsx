import express from "express";
import path from "path";
const server = express();

server.use(express.static(path.join(__dirname, "build")));

export default server;
