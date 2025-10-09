import mongoose from "mongoose";

const renameMongoIdFields = (data) => {
  if (Array.isArray(data)) {
    return data.map(renameMongoIdFields);
  }

  if (data && typeof data === "object" && data !== null) {
    const result = {};
    for (const [key, value] of Object.entries(data)) {
      // Rename _id to id
      const newKey = key === "_id" ? "id" : key;

      let newValue;

      // If value is an ObjectId, convert to string
      if (value instanceof mongoose.Types.ObjectId) {
        newValue = value.toString();
      } else {
        newValue = renameMongoIdFields(value);
      }

      result[newKey] = newValue;
    }
    return result;
  }

  return data;
};

export default renameMongoIdFields;