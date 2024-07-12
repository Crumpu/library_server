const { Router } = require("express");
// ==================================
const customersControllers = require("../controllers/customersControllers");
// ==================================
const {validateCustomer} = require("../middleware/validate.mw")
const router = new Router();

router
  .route("/")
  .get(customersControllers.getCustomers)
  .post(validateCustomer, customersControllers.createCustomer)
  .put(validateCustomer, customersControllers.updateCustomer);
router.route("/:id")
  .get(customersControllers.getCustomersById)
  .delete(customersControllers.deleteCustomer)


module.exports = router;