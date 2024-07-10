const db = require("../../db");

class CustomersControllers {
  // GET all customers

  async getCustomers(req, res) {
    try {
      const customers = await db.query(
        `SELECT id, full_name, email, phone, "createdAt", "updatedAt" FROM customers
        ORDER BY id`
      );
      if (customers.rows.length > 0) {
        console.log(customers.rows);
        res.json(customers.rows);
      } else {
        res.status(404).send("Customers not found");
      }
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }

  // GET customer by id

  async getCustomersById(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const customer = await db.query(
        `SELECT id, full_name, email, phone, "createdAt", "updatedAt" FROM customers
        WHERE id=$1`,
        [id]
      );
      if (customer.rows.length > 0) {
        res.json(customer.rows[0]);
      }
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }

  // POST  create customer
  async createCustomer(req, res) {
    const createdAt = new Date().toISOString();
    const { full_name, email, phone, password } = req.body;
    try {
      const newCustomer = await db.query(
        `INSERT INTO customers (full_name, email, phone, "createdAt", password)
        VALUES
        ($1, $2, $3, $4, $5)
        RETURNING *`,
        [full_name, email, phone, createdAt, password]
      );
      if (newCustomer.rows.length > 0) {
        res.json(newCustomer.rows[0]);
      } else {
        res.status(404).send("Customer not found");
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }

  // PUT update customer
  async updateCustomer(req, res) {
    const updatedAt = new Date().toISOString();
    const { full_name, email, phone, password, id } = req.body;
    try {
      const updatedCustomer = await db.query(
        `UPDATE customers
      SET full_name=$1, email=$2, phone=$3, "updatedAt"=$4, password=$5
      WHERE id=$6
      RETURNING *
      `,
        [full_name, email, phone, updatedAt, password, id]
      );
      if (updatedCustomer.rows.length > 0) {
        res.json(updatedCustomer.rows[0]);
      } else {
        res.status(404).send("Customer not found");
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
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
        res.json(deletedCustomer.rows);
      } else {
        res.status(404).send("Customer not found");
      }
    } catch (error) {
      console.log(error.message);
      console.log(error.message)
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = new CustomersControllers();
