class AppError extends Error {
  status: number;
  errors: string[];
  constructor(status: number, message: string, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;  }

  static UnauthorizedError() {
    return new AppError(401, "User is not authorized");
  }
  static BadRequest(message:string, errors = []) {
    return new AppError(400, message, errors);
  }
}

export default AppError;
