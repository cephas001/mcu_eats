export const vendorProfilePresenter = (data) => {
  const hiddenFields = [
    "activeOrders",
    "completedOrders",
    "pendingOrders",
    "userId",
    "updatedAt",
    "createdAt",
  ]; // define fields to exclude

  const cleanObject = (obj) => {
    const result = { ...obj };
    for (const field of hiddenFields) {
      delete result[field];
    }
    return result;
  };

  if (Array.isArray(data)) {
    return data.map(cleanObject);
  }

  if (typeof data === "object" && data !== null) {
    return cleanObject(data);
  }

  return data; // fallback for unexpected input
};
