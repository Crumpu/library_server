const db = require("../../db");

class CustomersControllers {
  async getCustomers(req, res) {
    try {
      const customers = await db.query(
        `SELECT id, full_name, phone FROM customers
        ORDER BY full_name`
      );
      res.json(actors.rows);
    } catch (error) {
      console.log(error);
    }
  }

  async getCustomerById(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const customer = await db.query(
        `
        SELECT id, full_name, phone, email FROM customers
        WHERE id=$1`,
        [id]
      );
    } catch (error) {
      console.log(error);
    }
  }

  async createCustomer(req, res) {
    try {
      const { full_name, email, phone, createdAt, updatedAt, password } =
        req.body;
      const newCustomer = await db.query(
        `
        INSERT INTO customers ( full_name, email, phone, createdAt, updatedAt, password)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
        [full_name, email, phone, createdAt, updatedAt, password]
      );
      res.json(newCustomer.rows)
    } catch (error) {
      console.log(error);
    }
  }

  async updateCustomer(req, res) {
    try {
      const { full_name, email, phone, createdAt, updatedAt, password, id } =
        req.body;
      const updatedCustomer = await db.query(
        `
        UPDATE customers 
        SET full_name=$1, email=$2, phone=$3, createdAt=$4, updatedAt=$5, password=$6
        WHERE id=$7
        RETURNING *`,
        [full_name, email, phone, createdAt, updatedAt, password, id]
      )
      res.json(...updatedCustomer.rows);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCustomer(req, res) { 
    try {
      const {
        params: { id },
      } = req;
      const deletedCustomer = await db.query(
        `
        DELETE FROM customers 
        WHERE id=$1
        RETURNING id, full_name`, [id]
      )
      if(deletedCustomer.rows.length > 0)
        res.json(deletedCustomer.rows);
      else{
        res.status(404).send('Customer not found')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new CustomersControllers()