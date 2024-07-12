const {
  CUSTOMER_VALIDATION_SCHEMA,
  AUTHOR_VALIDATION_SCHEMA,
  BOOK_VALIDATION_SCHEMA,
} = require("../utils/validationSchemas");

const validateAuthor = async (req, res, next) => {
  const { body } = req;
  try {
    const validatedAuthor = await AUTHOR_VALIDATION_SCHEMA.validate(body, {
      abortEarly: false,
    });
    req.body = validatedAuthor;
    next();
  } catch (error) {
    next(`Error is: ${error.errors}`)
  }
};

const validateCustomer = async (req, res, next) => {
  const { body } = req;
  try {
    const validatedCustomer = await CUSTOMER_VALIDATION_SCHEMA.validate(body, {
      abortEarly: false,
    });
    req.body = validatedCustomer;
    next();
  } catch (error) {
    next(`Error is: ${error.errors}`);
  }
};

const validateBook = async (req, res, next) => {
  const { body } = req;
  try {
    const validatedBook = await BOOK_VALIDATION_SCHEMA.validate(body, {
      abortEarly: false,
    });
    req.body = validatedBook;
    next();
  } catch (error) {
    next(`Error is: ${error.errors}`);
  }
};

module.exports = {
  validateAuthor,
validateCustomer,
validateBook
}