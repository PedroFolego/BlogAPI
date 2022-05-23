const {
  INTERNAL_SERVER_ERRROR_STATUS,
  errorMessage,
} = require('../utils/constants');

const errorMiddleware = (err, _req, res, _next) => {
  if (err.status) return res.status(err.status).json({ message: err.message });
  console.log(err);
  return res
    .status(INTERNAL_SERVER_ERRROR_STATUS)
    .json({ message: errorMessage.serverError });
};

module.exports = {
  errorMiddleware,
};