import { createError } from '../config/messages';

export const logErrors = (err, req, res, next) => {
  console.error(err.stack);
  next(err);
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err);
  } else {
    res.status(500).send(createError('Internal Server Error'));
  }
};
