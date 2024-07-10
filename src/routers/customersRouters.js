const { Router } = require("express")
// ==================================
const booksControllers = require("../controllers/customersControllers")
const router = new Router(); 

router 
  .route("/")
  .get(booksControllers.getCustomers)
//   .post(booksControllers.createCustomer)
//   .put(booksControllers.updateCustomer);
// router 
//   .route("/:id")
//   .get(booksControllers.getCustomersById)
//   .delete(booksControllers.deleteCustomer);