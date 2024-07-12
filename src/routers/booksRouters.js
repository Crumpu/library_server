const {Router} =require('express')
// ===============================
const booksControllers = require("../controllers/booksControllers")
// ===============================
const {validateBook} = require("../middleware/validate.mw")
const router = new Router();

router
  .route("/")
  .get(booksControllers.getBooks)
  .post(validateBook, booksControllers.createBook)
  .put(validateBook, booksControllers.updateBook);
router
  .route("/:id")
  .get(booksControllers.getBookById)
  .delete(booksControllers.deleteBook);

  module.exports = router;