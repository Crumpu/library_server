const {Router} =require('express')
// ===============================
const booksControllers = require("../controllers/booksControllers")
const router = new Router();

router
  .route("/")
  .get(booksControllers.getBooks)
  .post(booksControllers.createBook)
  .put(booksControllers.updateBook);
router
  .route("/:id")
  .get(booksControllers.getBookById)
  .delete(booksControllers.deleteBook);

  module.exports = router;