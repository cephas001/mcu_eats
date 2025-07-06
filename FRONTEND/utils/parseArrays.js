export const parseArrays = (input) => {
  if (Array.isArray(input)) {
    return input.map(parseArrays);
  } else if (typeof input === "object" && input !== null) {
    return Object.keys(input).reduce((acc, key) => {
      acc[key] = parseArrays(input[key]);
      return acc;
    }, {});
  } else if (typeof input === "string") {
    try {
      const parsed = JSON.parse(input);
      // If it's an array, keep going recursively
      if (Array.isArray(parsed) || typeof parsed === "object") {
        return parseArrays(parsed);
      }
    } catch (e) {
      // Not a parsable JSON string — leave it be
      return input;
    }
  }
  return input;
};

// This function recursively parses strings that are JSON arrays or objects
