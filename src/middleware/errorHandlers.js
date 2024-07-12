const { ValidationError } = require("yup");

const validationErrorHandler = (err, req, res) => {
  if (err instanceof ValidationError) {
    return res.status(418).send({
      errors: [
        {
          title: "Validation error",
          details: err.errors,
        },
      ],
    });
  }
  next(err);
};

const errorHandler = (err, req, res, next) => {
  if (res.headerSent) {
    return;
  }

  res.status(err?.status ?? 500).send({
    errors: [
      {
        title: err?.message ?? "Internal server error",
        details: err.errors,
      },
    ],
  });
};

module.exports = { errorHandler, validationErrorHandler };