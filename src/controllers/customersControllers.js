const db = require('../../db')

class CustomersControllers{
  async getCustomers(req, res) {
     try {
       const customers = await db.query(
         `SELECT id, full_name, email, phone, "createdAt", "updatedAt" FROM customers
        ORDER BY id`
       )
       if (customers.rows.length > 0) {
         console.log(customers.rows)
         res.json(customers.rows)
       } else {
         res.status(404).send('No customers found')
       }
     } catch (error) {
      console.log(error.message)
     }
   }
}

module.exports = new CustomersControllers()