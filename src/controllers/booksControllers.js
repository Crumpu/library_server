const db = require("../../db");

class BooksControllers {
  async getBooks(req, res) {
    try {
      const books = await db.query(
        `SELECT books.id, books.title, books.description, genres.title AS genres, shelves.title AS shelves, image, books."created_at", books."updated_at"
        FROM books
        JOIN genres ON books.genre_id = genres.id
        JOIN shelves ON books.shelf_id = shelves.id
        ORDER BY books.id`
      );
      if (books.rows.length > 0) {
        res.json(books.rows);
      } else {
        res
          .status(404)
          .send(`Books can't be getting, error is: ${error.message}`);
      }
    } catch (error) {
      res.status(500).send(`Books can't getting, error is: ${error.message}`);
    }
  }

  async getBookById(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const book = await db.query(
        `
        SELECT books.id, books.title, books.description, genres.title AS genres, shelves.title AS shelves, image, books."created_at", books."updated_at"
        FROM books
        JOIN genres ON books.genre_id = genres.id
        JOIN shelves ON books.shelf_id = shelves.id
        WHERE books.id=$1`,
        [id]
      );
      if (book.rows.length > 0) {
        res.json(book.rows[0]);
      } else {
        res
          .status(404)
          .send(`Book can't be getting, error is: ${error.message}`);
      }
    } catch (error) {
      res.status(500).send(`Book can't getting, error is: ${error.message}`);
    }
  }

  async createBook(req, res) {
    try {
      const created_at = new Date().toISOString();
      const { title, genre, shelf, description, image } = req.body;
      const newBook = await db.query(
        `INSERT INTO books(title, genre_id, shelf_id, description, "created_at", image)
        VALUES 
        ($1, (SELECT genres.id FROM genres WHERE genres.title=$2), (SELECT shelves.id FROM shelves WHERE shelves.title=$3), $4, $5, $6)
        RETURNING *`,
        [title, genre, shelf, description, created_at, image]
      );
      if (newBook.rows.length > 0) {
        res.json(newBook.rows[0]);
      } else {
        
        res
          .status(404)
          .send(`Book can't be created, error is: ${error.message}`);
      }
    } catch (error) {
      res.status(500).send(`Book can't created, error is: ${error.message}`);
    }
  }

  async updateBook(req, res) {
    try {
      const { title, genre, shelf, description, image, id } = req.body;
      const updated_at = new Date().toISOString();
      const updatedBook = await db.query(
        `
        UPDATE books 
        SET title=$1, genre_id=(SELECT id FROM genres WHERE title=$2), shelf_id=(SELECT id FROM shelves WHERE title=$3), description=$4, "updated_at"=$5, image=$6
        WHERE id=$7
        RETURNING *`,
        [title, genre, shelf, description, updated_at, image, id]
      );
      if (updatedBook.rows.length > 0) {
        res.json(updatedBook.rows[0]);
      } else {
        res
          .status(404)
          .send(`Book can't be updated, error is: ${error.message}`);
      }
    } catch (error) {
      res.status(500).send(`Book can't updated, error is: ${error.message}`);
    }
  }

  async deleteBook(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const deletedBook = await db.query(
        `
        DELETE FROM books 
        WHERE id=$1
        RETURNING id, title`,
        [id]
      );
      if (deletedBook.rows.length > 0) {
        res.json(deletedBook.rows[0]);
      } else {
        res
          .status(404)
          .send(`Book can't be deleted, error is: ${error.message}`);
      }
    } catch (error) {
      res.status(500).send(`Book can't deleted, error is: ${error.message}`);
    }
  }
}

module.exports = new BooksControllers();
