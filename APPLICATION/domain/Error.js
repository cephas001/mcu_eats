export class ValidationError extends Error {
  constructor(message, inputName, errorList = null) {
    super(message);
    this.name = "ValidationError";
    this.type = "ValidationError";
    this.inputName = inputName;
    this.errorList = errorList;
  }
}

export class UserExistenceError extends Error {
  constructor(message) {
    super(message);
    this.name = "UserExistenceError";
    this.type = "UserExistenceError";
  }
}

export class ProfileExistenceError extends Error {
  constructor(message) {
    super(message);
    this.name = "ProfileExistenceError";
    this.type = "ProfileExistenceError";
  }
}

export class InvalidCredentialsError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidCredentialsError";
    this.type = "InvalidCredentialsError";
  }
}

export class UnexpectedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnexpectedError";
    this.type = "UnexpectedError";
  }
}

export class InvalidTokenError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidTokenError";
    this.type = "InvalidTokenError";
  }
}

export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
    this.type = "UnauthorizedError";
  }
}

export class LocalStorageError extends Error {
  constructor(message) {
    super(message);
    this.name = "LocalStorageError";
    this.type = "LocalStorageError";
  }
}
