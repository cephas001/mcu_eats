const renameMongoIdFields = (data) => {
  if (Array.isArray(data)) {
    return data.map(renameMongoIdFields);
  }

  if (data && typeof data === "object") {
    const result = {};
    for (const [key, value] of Object.entries(data)) {
      let newKey = key === "_id" ? "id" : key;
      let newValue = renameMongoIdFields(value);

      // Convert ObjectId to string if key is _id
      if (key === "_id" && typeof value === "object" && value?.toString) {
        newValue = value.toString();
      }

      result[newKey] = newValue;
    }
    return result;
  }

  return data;
};

export default renameMongoIdFields;
