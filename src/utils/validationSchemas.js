const yup = require("yup");

const CUSTOMER_VALIDATION_SCHEMA = yup.object().shape({
  full_name: yup.string("Full name must be string").trim().min(2).required(),
  email: yup.string().email().required(),
  phone: yup
    .string()
    .matches(/^\d{10,}$/, "Must be 10 or more digits")
    .nullable(),
  createdAt: yup.date("This field must be date").min("2021-01-01").nullable(),
  updatedAt: yup.date("This field must be date").nullable(),
  password: yup.string().min(8).max(20),
});

const AUTHOR_VALIDATION_SCHEMA = yup.object().shape({
  full_name: yup.string("Full name must be string").trim().min(2).required(),
  email: yup.string().email().required(),
  nationality_id: yup.number().integer(),
  createdAt: yup.date("This field must be date").min("2021-01-01").nullable(),
  updatedAt: yup.date("This field must be date").nullable(),
});

const BOOK_VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required(),
  genre_id: yup.number().integer().required(),
  shelf_id: yup.number().integer().required(),
  description: yup.string(),
  createdAt: yup.date("This field must be date").min("2021-01-01").nullable(),
  updatedAt: yup.date("This field must be date").nullable(),
});

module.exports = {
  CUSTOMER_VALIDATION_SCHEMA,
  AUTHOR_VALIDATION_SCHEMA,
  BOOK_VALIDATION_SCHEMA
};