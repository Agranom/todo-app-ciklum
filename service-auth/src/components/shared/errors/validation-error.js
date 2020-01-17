import { AppError } from './app-error';

export class ValidationError extends AppError {
  constructor(errors) {
    super(400, 'Validation error', 'validationError');
    this.invalidProperties = Object.keys(errors).map((key) => ({ name: key, message: errors[key].message }));
  }
}
