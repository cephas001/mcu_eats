// Takes the variable name of object to be stored
// Takes the object
// Checks if the object is present in localstorage and makes updates according to the variableToChange defined
// Takes the New Value

export const updateLocalStorageOrders = (
  itemName,
  item,
  variableToChange,
  newValue
) => {
  const itemPreSaved = localStorage.getItem(`${itemName}`);

  if (itemPreSaved) {
    const itemPreSavedValue = JSON.parse(itemPreSaved);

    for (var i = 0; i < itemPreSavedValue.length; i++) {
      if (itemPreSavedValue[i]._id == item._id) {
        itemPreSavedValue[i][variableToChange] = newValue;
        localStorage.setItem(`${itemName}`, JSON.stringify(itemPreSavedValue));
      } else {
        const itemsToSave = [...itemPreSavedValue, item];
        localStorage.setItem(`${itemName}`, JSON.stringify(itemsToSave));
      }
    }
  } else {
    const itemsToSave = [item];
    localStorage.setItem(`${itemName}`, JSON.stringify(itemsToSave));
  }
};
