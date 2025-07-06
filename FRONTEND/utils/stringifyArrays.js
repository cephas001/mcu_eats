export const stringifyArrays = (obj) => {
  if (Array.isArray(obj)) {
    return JSON.stringify(obj); // Convert arrays to string
  } else if (typeof obj === "object" && obj !== null) {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = stringifyArrays(obj[key]); // Recursively stringify nested arrays
      return acc;
    }, {});
  }
  return obj; // Return other data types unchanged
};
