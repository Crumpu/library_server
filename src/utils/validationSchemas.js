const yup = require("yup");

const CUSTOMER_VALIDATION_SCHEMA = yup.object().shape({
  phone: yup
    .string()
    .matches(/^\d{10,}$/, "Must be 10 or more digits")
    .nullable(),
  password: yup.string().min(8).max(20),
});

const AUTHOR_VALIDATION_SCHEMA = yup.object().shape({
  nationality_id: yup.string(),
});

const BOOK_VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required(),
  genre_id: yup.string().required(),
  shelf_id: yup.string().required(),
  description: yup.string().nullable(),
});

const CONSTRAINT_FOR_HUMAN = yup.object().shape({
  email: yup.string().email().required(),
  full_name: yup.string("Full name must be string").trim().min(2).required(),
});

const GENERAL_CONSTRAINT = yup.object().shape({
  createdAt: yup.date("This field must be date").nullable(),
  updatedAt: yup.date("This field must be date").nullable(),
});

module.exports = {
  CUSTOMER_VALIDATION_SCHEMA,
  AUTHOR_VALIDATION_SCHEMA,
  BOOK_VALIDATION_SCHEMA,
  CONSTRAINT_FOR_HUMAN,
  GENERAL_CONSTRAINT,
};
