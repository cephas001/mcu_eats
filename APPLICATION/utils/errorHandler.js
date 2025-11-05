import { ValidationError } from "../domain/Error.js";

export const inputErrorHandler = (schema, data) => {
  const validation = schema.safeParse(data);
console.log(validation)
console.log(data)
  if (!validation.success) {
    const errorList = validation.error.errors.map((e) => ({
      inputName: e.path.join(".") || "unknown",
      errorMessage: e.message,
    }));

    throw new ValidationError("Validation failed", null, errorList);
  }

  return validation.data;
};
