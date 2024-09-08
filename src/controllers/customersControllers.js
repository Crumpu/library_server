const db = require("../../db");

class CustomersControllers {
  // GET all customers

  async getCustomers(req, res) {
    try {
      const customers = await db.query(
        `SELECT id, full_name, email, phone, "created_at", "updated_at" FROM customers
        ORDER BY id`
      );
      if (customers.rows.length > 0) {
        res.json(customers.rows);
      } else {
        res
          .status(404)
          .send(`Customers can't be getting, error is: ${error.message}`);
      }
    } catch (error) {
      res
        .status(500)
        .send(`Customers can't getting, error is: ${error.message}`);
    }
  }

  // GET customer by id

  async getCustomersById(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const customer = await db.query(
        `SELECT id, full_name, email, phone, "created_at", "updated_at" FROM customers
        WHERE id=$1`,
        [id]
      );
      if (customer.rows.length > 0) {
        res.json(customer.rows[0]);
      } else {
        res
          .status(404)
          .send(`Customer can't be getting, error is: ${error.message}`);
      }
    } catch (error) {
      res
        .status(500)
        .send(`Customer can't getting, error is: ${error.message}`);
    }
  }


  // POST  create customer
  async createCustomer(req, res) {
    const created_at = new Date().toISOString();
    const { full_name, email, phone, password } = req.body;
    try {
      const newCustomer = await db.query(
        `INSERT INTO customers (full_name, email, phone, created_at, password)
        VALUES
        ($1, $2, $3, $4, $5)
        RETURNING *`,
        [full_name, email, phone, created_at, password]
      );
      if (newCustomer.rows.length > 0) {
        res.json(newCustomer.rows[0]);
      } else {
        res
          .status(404)
          .send(`Customer can't be created, error is: ${error.message}`);
      }
    } catch (error) {
      res
        .status(500)
        .send(`Customer can't created, error is: ${error.message}`);
    }
  }


  // PUT update customer
  async updateCustomer(req, res) {
    const updated_at = new Date().toISOString();
    const { full_name, email, phone, password, id } = req.body;
    try {
      const updatedCustomer = await db.query(
        `UPDATE customers
      SET full_name=$1, email=$2, phone=$3, "updated_at"=$4, password=$5
      WHERE id=$6
      RETURNING *
      `,
        [full_name, email, phone, updated_at, password, id]
      );
      if (updatedCustomer.rows.length > 0) {
        res.json(updatedCustomer.rows[0]);
      } else {
        res
          .status(404)
          .send(`Customer can't be updated, error is: ${error.message}`);
      }
    } catch (error) {
      res
        .status(500)
        .send(`Customer can't updated, error is: ${error.message}`);
    }
  }
 
  // DELETE delete customer

  async deleteCustomer(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const deletedCustomer = await db.query(
        `DELETE FROM customers 
        WHERE id=$1
        RETURNING full_name, id`,
        [id]
      );
      if (deletedCustomer.rows.length > 0) {
        res.json(deletedCustomer.rows[0]);
      } else {
        res
          .status(404)
          .send(`Customer can't be deleted, error is: ${error.message}`);
      }
    } catch (error) {
      res
        .status(500)
        .send(`Customer can't deleted, error is: ${error.message}`);
    }
  }
}
module.exports = new CustomersControllers();
