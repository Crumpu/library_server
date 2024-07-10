const { Router } = require("express");
// ==================================
const authorRouters = require("./authorRouters");
const bookRouters = require("./booksRouters");
const customerRouters = require("./customersRouters");

const router = new Router();

router.use("/authors", authorRouters);
router.use("/books", bookRouters);
router.use("/customers", customerRouters);

module.exports = router;
