export class ValidationError extends Error {
  constructor(message, inputName, errorList = null) {
    super(message);
    this.name = "ValidationError";
    this.type = "ValidationError";
    this.inputName = inputName;
    this.errorList = errorList;
  }
}

export class UserAlreadyExistsError extends Error {
  constructor(message) {
    super(message);
    this.name = "UserAlreadyExistsError";
    this.type = "UserAlreadyExistsError";
  }
}

export class UnexpectedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnexpectedError";
    this.type = "UnexpectedError";
  }
}
