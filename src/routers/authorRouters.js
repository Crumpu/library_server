const { Router } = require("express");

//  ==================================
const authorControllers = require("../controllers/authorsControllers");
const router = new Router();

router
  .route("/")
  .get(authorControllers.getAuthors)
  .post(authorControllers.createAuthor)
  .put(authorControllers.updateAuthor);
router
  .route("/:id")
  .get(authorControllers.getAuthorById)
  .delete(authorControllers.deleteAuthor);

module.exports = router;
