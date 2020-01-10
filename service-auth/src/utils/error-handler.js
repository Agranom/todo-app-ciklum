export class ErrorHandler extends Error {
  constructor(statusCode = 500, message = 'Internal Server Error', type = 'error') {
    super();
    this.type = type;
    this.statusCode = statusCode;
    this.message = message;
  }
}

export function handleError(err, res) {
  const { statusCode } = err;
  res.status(statusCode).json({ ...err });
}
