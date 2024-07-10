const { Router } = require("express");
// ==================================
const customersControllers = require("../controllers/customersControllers");
const router = new Router();

router
  .route("/")
  .get(customersControllers.getCustomers)
  .post(customersControllers.createCustomer)
  .put(customersControllers.updateCustomer)
router.route("/:id")
  .get(customersControllers.getCustomersById)
  .delete(customersControllers.deleteCustomer)


module.exports = router;