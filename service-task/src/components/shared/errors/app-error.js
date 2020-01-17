export class AppError extends Error {
  constructor(statusCode = 500, message = 'Internal Server Error', type = 'error', isOperational = true) {
    super();
    this.type = type;
    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = isOperational;
  }
}
