const { Router } = require("express");

//  ==================================
const authorControllers = require("../controllers/authorsControllers");
// ===================================
const { validateAuthor } = require("../middleware/validate.mw");
const router = new Router();

router
  .route("/")
  .get(authorControllers.getAuthors)
  .post(validateAuthor, authorControllers.createAuthor)
  .put(validateAuthor, authorControllers.updateAuthor);
router
  .route("/:id")
  .get(authorControllers.getAuthorById)
  .delete(authorControllers.deleteAuthor);

module.exports = router;
