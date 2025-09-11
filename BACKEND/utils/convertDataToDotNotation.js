export const convertDataToDotNotation = (data, parentKey = "") => {
  let result = {};

  for (const [key, value] of Object.entries(data)) {
    const newKey = parentKey ? `${parentKey}.${key}` : key;

    if (value && typeof value === "object" && !Array.isArray(value)) {
      const nested = convertDataToDotNotation(value, newKey);
      result = { ...result, ...nested };
    } else {
      result[newKey] = value;
    }
  }

  return result;
};
