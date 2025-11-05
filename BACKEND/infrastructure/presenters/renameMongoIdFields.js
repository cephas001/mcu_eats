import mongoose from "mongoose";

const renameMongoIdFields = (data) => {
  if (Array.isArray(data)) {
    return data.map(renameMongoIdFields);
  }

  if (data && typeof data === "object" && data !== null) {
    if (data instanceof Date) {
      return data;
    }

    const result = {};
    for (const [key, value] of Object.entries(data)) {
      // Rename _id to id
      const newKey = key === "_id" ? "id" : key;

      let newValue;

      // Convert ObjectId to string
      if (value instanceof mongoose.Types.ObjectId) {
        newValue = value.toString();
      }
      // Preserve Date objects
      else if (value instanceof Date) {
        newValue = value;
      }
      // Recurse for other nested objects/arrays
      else {
        newValue = renameMongoIdFields(value);
      }

      result[newKey] = newValue;
    }
    return result;
  }

  return data;
};

export default renameMongoIdFields;
