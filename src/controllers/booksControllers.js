const db = require("../../db");

class BooksControllers {
  async getBooks(req, res) {
    try {
      const books = await db.query(
        `SELECT title, genres.title shelves.title, description, createdAt, updatedAt, image 
        FROM books
        JOIN genres ON books.genre_id = genres.id
        JOIN shelves ON books.shelf_id = shelves.id
        ORDER BY title`
      );
      console.log(books);
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
        SELECT id, title, genres.title shelves.title, description, createdAt, updatedAt, image 
        FROM books
        JOIN genres ON books.genre_id = genres.id
        JOIN shelves ON books.shelf_id = shelves.id
        WHERE id=$1`,
        [id]
      );
    } catch (error) {
      console.log(error);
    }
  }

  async createBook(req, res) {
    try {
      const { full_name, email, phone, createdAt, updatedAt, password } =
        req.body;
      const newBook = await db.query(
        `INSERT INTO books(title, genre_id, shelf_id, description, createdAt, updatedAt, image)
        VALUES 
        ($1, (SELECT id FROM genres WHERE title=$2), (SELECT id FROM shelves WHERE title=$3), $4, $5, $6, $7)
        `, [title, genre_id, shelf_id, description, createdAt, updatedAt, image]
      );
      res.json(newBook.rows)
    } catch (error) {
      console.log(error);
    }
  }

  async updateBook(req, res) {
    try {
      const { title, genre_id, shelf_id, description, createdAt, updatedAt, image, id } =
        req.body;
      const updatedBook= await db.query(
        `
        UPDATE books 
        SET title=$1, genre_id=(SELECT id FROM genres WHERE title=$2), shelf_id=(SELECT id FROM shelves WHERE title=$3), description=$4, createdAt=$5, updatedAt=$6, image=$7
        WHERE id=$8
        RETURNING *`,
        [title, genre_id, shelf_id, description, createdAt, updatedAt, image, id]
      );
      res.json(...updatedBook.rows);
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
      if(deletedBook.rows.length > 0)
        res.json(deletedBook.rows);
      else{
        res.status(404).send('Book not found')
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new BooksControllers();
