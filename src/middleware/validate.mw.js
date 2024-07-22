const {
  CUSTOMER_VALIDATION_SCHEMA,
  AUTHOR_VALIDATION_SCHEMA,
  BOOK_VALIDATION_SCHEMA,
  GENERAL_CONSTRAINT,
  CONSTRAINT_FOR_HUMAN,
} = require("../utils/validationSchemas");

const validateAuthor = async (req, res, next) => {
  const { body } = req;
  const COMBINED_AUTHOR_VALIDATION_SCHEMA =
    AUTHOR_VALIDATION_SCHEMA.concat(GENERAL_CONSTRAINT).concat(
      CONSTRAINT_FOR_HUMAN
    );
  try {
    const validatedAuthor = await COMBINED_AUTHOR_VALIDATION_SCHEMA.validate(
      body,
      {
        abortEarly: false,
      }
    );
    req.body = validatedAuthor;
    next();
  } catch (error) {
    next(`Error is: ${error.errors}`);
  }
};

const validateCustomer = async (req, res, next) => {
  const { body } = req;
  const COMBINED_CUSTOMER_VALIDATION_SCHEMA =
    CUSTOMER_VALIDATION_SCHEMA.concat(GENERAL_CONSTRAINT).concat(
      CONSTRAINT_FOR_HUMAN
    );
  try {
    const validatedCustomer =
      await COMBINED_CUSTOMER_VALIDATION_SCHEMA.validate(body, {
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
  const COMBINED_BOOK_VALIDATION_SCHEMA =
    BOOK_VALIDATION_SCHEMA.concat(GENERAL_CONSTRAINT);
  try {
    const validatedBook = await COMBINED_BOOK_VALIDATION_SCHEMA.validate(body, {
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
  validateBook,
};
