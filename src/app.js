// const path = require("path");
// =========================
const express = require("express");
// const router = require('./routers')
// app.use(router)

const app = express();


app.use(express.json());

module.exports = app;
