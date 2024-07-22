const db = require("../../db");

class AuthorControllers {
  async getAuthors(req, res) {
    try {
      const authors = await db.query(
        `SELECT authors.id, full_name, email, nationalities.title, authors."createdAt", authors."updatedAt" FROM authors
        JOIN nationalities ON authors.nationality_id = nationalities.id
        ORDER BY authors.id`
      );
      if (authors.rows.length > 0) {
        res.json(authors.rows);
      } else { 
        res
          .status(404)
          .send(`Authors can't be getting, error is: ${error.message}`);
      }
    } catch (error) {
      res.status(500).send(`Authors can't getting, error is: ${error.message}`);
    }
  }

  async getAuthorById(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const author = await db.query(
        `SELECT authors.id, full_name, email, nationalities.title, authors."createdAt", authors."updatedAt" FROM authors
        JOIN nationalities ON authors.nationality_id = nationalities.id
        WHERE authors.id=$1`,
        [id]
      );
      if (author.rows.length > 0) {
        res.json(author.rows[0]);
      } else {
        res
          .status(404)
          .send(`Author can't getting, error is: ${error.message}`);
      }
    } catch (error) {
      res.status(500).send(`Authors can't getting, error is: ${error.message}`);
    }
  }

  async createAuthor(req, res) {
    try {
      const createdAt = new Date().toISOString();
      const { full_name, email, nationality_id } = req.body;
      const newAuthor = await db.query(
        `INSERT INTO authors(full_name, email, nationality_id, "createdAt")
        VALUES 
        ($1, $2, (SELECT id FROM nationalities WHERE title=$3), $4)
        RETURNING *`,
        [full_name, email, nationality_id, createdAt]
      );
      if (newAuthor.rows.length > 0) {
        res.json(newAuthor.rows[0]);
      } else {
        res
          .status(404)
          .send(`Author can't created, error is: ${error.message}`);
      }
    } catch (error) {
      res.status(500).send(`Authors can't created, error is: ${error.message}`);
    }
  }
 
  async updateAuthor(req, res) {
    try {
      const updatedAt = new Date().toISOString();
      const { full_name, email, nationality_id, id } = req.body;
      console.log(full_name);
      const updatedAuthor = await db.query(
        `UPDATE authors 
        SET 
        full_name=$1, email=$2, nationality_id=(SELECT id FROM nationalities WHERE title=$3), "updatedAt"=$4
        WHERE id=$5
        RETURNING *`,
        [full_name, email, nationality_id, updatedAt, id]
      );
      if (updatedAuthor.rows.length > 0) {
        res.json(updatedAuthor.rows[0]);
      } else {
        res.status(404).send(`Author can't updated, error is: ${error.message}`);
      }
    } catch (error) {
      res.status(500).send(`Authors can't updated, error is: ${error.message}`);
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
      if (deletedAuthor.rows.length > 0) {
        res.json(deletedAuthor.rows[0]);
      } else {
        res
          .status(404)
          .send(`Author can't deleted, error is: ${error.message}`);
      }
    } catch (error) {
      res.status(500).send(`Authors can't deleted, error is: ${error.message}`);
    }
  }
}

module.exports = new AuthorControllers();
