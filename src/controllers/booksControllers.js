const db = require("../../db");

class BooksControllers {
  async getBooks(req, res) {
    try {
      const books = await db.query(
        `SELECT books.id, books.title, books.description, genres.title AS genres, shelves.title AS shelves, image, books."createdAt", books."updatedAt"
        FROM books
        JOIN genres ON books.genre_id = genres.id
        JOIN shelves ON books.shelf_id = shelves.id
        ORDER BY books.id`
      );
      console.log(books.rows);
      res.json(books.rows);
    } catch (error) {
      console.log(error);
    }
  }

  async getBookById(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const book = await db.query(
        `
        SELECT books.id, books.title, books.description, genres.title AS genres, shelves.title AS shelves, image, books."createdAt", books."updatedAt"
        FROM books
        JOIN genres ON books.genre_id = genres.id
        JOIN shelves ON books.shelf_id = shelves.id
        WHERE books.id=$1`,
        [id]
      );
      if (book.rows.length > 0) {
        res.json(book.rows[0]);
      } else {
        res.status(404).send("Book not found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createBook(req, res) {
    try {
      const createdAt = new Date().toISOString()
      const {
        title,
        genre_id,
        shelf_id,
        description,
        image,
      } = req.body;
      const newBook = await db.query(
        `INSERT INTO books(title, genre_id, shelf_id, description, "createdAt", image)
        VALUES 
        ($1, (SELECT genres.id FROM genres WHERE genres.title=$2), (SELECT shelves.id FROM shelves WHERE shelves.title=$3), $4, $5, $6)
        RETURNING *`,
        [title, genre_id, shelf_id, description, createdAt, image]
      );
      if (newBook.rows.length > 0) {
        res.json(newBook.rows[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateBook(req, res) {
    try {
      const { title, genre_id, shelf_id, description, image, id } =
        req.body;
      const updatedAt = new Date().toISOString();
      const updatedBook = await db.query(
        `
        UPDATE books 
        SET title=$1, genre_id=(SELECT id FROM genres WHERE title=$2), shelf_id=(SELECT id FROM shelves WHERE title=$3), description=$4, "updatedAt"=$5, image=$6
        WHERE id=$7
        RETURNING *`,
        [
          title,
          genre_id,
          shelf_id,
          description,
          updatedAt,
          image,
          id,
        ]
      );
      if (updatedBook.rows.length > 0) {
        console.log(updatedBook.rows[0]);
        res.json(updatedBook.rows[0]);
      } else {
        res.status(404).send("Book not found");
      }
    } catch (error) {
      console.log(error);
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
        res.json(deletedBook.rows);
      } else {
        res.status(404).send("Book not found");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new BooksControllers();
