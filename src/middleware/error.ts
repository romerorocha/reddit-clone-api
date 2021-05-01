export const logErrors = (err, req, res, next) => {
  console.error(err.stack);
  next(err);
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err);
  } else {
    res.status(500).send({ status: 500, mensagem: "Internal Server Error" });
  }
};
