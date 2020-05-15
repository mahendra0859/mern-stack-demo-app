module.exports = (
  res,
  message = "Internal server error",
  statusCode = 500,
  success = false,
  result = null
) => {
  res.status(statusCode).json({ statusCode, success, message, result });
};
