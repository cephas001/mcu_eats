const renameMongoIdFields = (data) => {
  if (Array.isArray(data)) {
    return data.map(renameMongoIdFields);
  }

  if (data && typeof data === "object") {
    const result = {};
    for (const [key, value] of Object.entries(data)) {
      const newKey = key === "_id" ? "id" : key;
      result[newKey] = renameMongoIdFields(value);
    }
    return result;
  }

  return data;
};

export default renameMongoIdFields;
