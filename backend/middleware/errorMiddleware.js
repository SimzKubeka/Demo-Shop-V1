const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Path: backend/middleware/errorMiddleware.js
const errorHandler = (err, req, res, next) => {
  // Check if the error is 404
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  //Check for Mongoose bad ObjectId
  if(err.name === 'CastError' && err.kind === 'ObjectId'){
    statusCode = 404;
    message = 'Resource not found';
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

// Export the middleware
export { notFound, errorHandler };