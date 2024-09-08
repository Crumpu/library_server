// const path = require("path");
// =========================
const express = require("express");
const router = require("./routers");
const app = express();

const {
  errorHandlers: { errorHandler, validationErrorHandler },
} = require("./middleware");

app.use(express.json());
app.use(router);
app.use(validationErrorHandler, errorHandler);

module.exports = app;
