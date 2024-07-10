const { Router } = require("express");
// ==================================
const authorRouters = require("./authorRouters");

const router = new Router();

router.use("/authors", authorRouters);

module.exports = router;