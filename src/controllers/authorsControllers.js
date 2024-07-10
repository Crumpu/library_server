const db = require("../../db");

class AuthorControllers {
  async getAuthors(req, res) {
    try {
      const authors = await db.query(
        `SELECT authors.id, full_name, email, nationalities.title, authors."createdAt", authors."updatedAt" FROM authors
        JOIN nationalities ON authors.nationality_id = nationalities.id
        ORDER BY authors.id`
      );
      console.log(authors.rows);
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
        `SELECT authors.id, full_name, email, nationalities.title, authors."createdAt", authors."updatedAt" FROM authors
        JOIN nationalities ON authors.nationality_id = nationalities.id
        WHERE authors.id=$1`,
        [id]
      );
      if (author.rows.length > 0) {
        res.json(author.rows);
      } else {
        res.status(404).send("Author not found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createAuthor(req, res) {
    try {
      const createdAt = new Date().toISOString();
      const { full_name, email, nationality_id } =
        req.body;
      const newAuthor = await db.query(
        `INSERT INTO authors(full_name, email, nationality_id, "createdAt", "updatedAt")
        VALUES 
        ($1, $2, (SELECT id FROM nationalities WHERE title=$3), $4)
        RETURNING *`,
        [full_name, email, nationality_id, createdAt]
      );
      res.json(newAuthor.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async updateAuthor(req, res) {
    try {
      const updatedAt = new Date().toISOString();
      const { full_name, email, nationality_id, id } =
        req.body;
      console.log(full_name)
      const updatedAuthor = await db.query(
        `UPDATE authors 
        SET 
        full_name=$1, email=$2, nationality_id=(SELECT id FROM nationalities WHERE title=$3), "updatedAt"=$4
        WHERE id=$5
        RETURNING *`,
        [full_name, email, nationality_id, updatedAt, id]
      );
      console.log(updatedAuthor);
      res.json(...updatedAuthor.rows);
    } catch (error) {
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
      if (deletedAuthor.rows.length > 0) res.json(deletedAuthor.rows[0]);
      else {
        res.status(404).send("Author not found");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new AuthorControllers();
