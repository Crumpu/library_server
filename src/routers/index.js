const { Router } = require("express");
// ==================================
const authorRouters = require("./authorRouters");
const bookRouters = require("./booksRouters");
const customers = require("./customersRouters");

const router = new Router();

router.use("/authors", authorRouters);
router.use("/books", bookRouters);

module.exports = router;
