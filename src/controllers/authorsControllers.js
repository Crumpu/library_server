const db = require("../../db");

class AuthorControllers {
  async getAuthors(req, res) {
    try {
      const authors = await db.query(
        `SELECT id, full_name, email, nationalities.title, createdAt, updatedAt FROM authors
        JOIN nationalities ON authors.nationality_id = nationalities.id
        ORDER BY full_name`
      );
      res.json(authors.rows);
    } catch (error) {
      console.log(error);
    }
  }

  async getAuthorById(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const author = await db.query(
        `
        SELECT id, full_name, email, nationalities.title, createdAt, updatedAt FROM authors
        JOIN nationalities ON authors.nationality_id = nationalities.id
        WHERE id=$1`,
        [id]
      );
    } catch (error) {
      console.log(error);
    }
  }

  async createAuthor(req, res) {
    try {
      const { full_name, email, nationality_id, createdAt, updatedAt } =
        req.body;
      const newAuthor = await db.query(
        `INSERT INTO authors(full_name, email, nationality_id, createdAt, updatedAt)
        VALUES 
        ($1, $2, (SELECT id FROM nationalities WHERE title=$3), $4, $5)
        RETURNING *`,
        [full_name, email, nationality_id, createdAt, updatedAt]
      );
      res.json(newAuthor.rows);
    } catch (error) {
      console.log(error);
    }
  }

  async updateAuthor(req, res) {
    try {
      const {full_name, email, nationality_id, createdAt, updatedAt, id} = req.body;
      const updatedAuthor = await db.query(
        `UPDATE authors 
        SET 
        full_name=$1, email=$2, nationality_id=(SELECT id FROM nationalities WHERE title=$3), createdAt=$4, updatedAt=$5
        WHERE id=$6`, [full_name, email, nationality_id, createdAt, updatedAt, id]
      );
      res.json(...updatedAuthor.rows)
    }
    catch (error) {
      console.log(error);
    }
  }

  async deleteAuthor(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const deletedAuthor = await db.query(
        `DELETE FROM authors WHERE id=$1 RETURNING id, full_name`,
        [id]
      );
      if(deletedAuthor.rows.length > 0)
        res.json(deletedAuthor.rows);
      else{
        res.status(404).send('Author not found')
      }
    } catch (error) {
      console.log(error);
    }
  }

}

module.exports = new AuthorControllers();