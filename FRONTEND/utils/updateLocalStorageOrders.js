export const updateLocalStorageOrders = (product, vendor, operation) => {
  const ordersPreSaved = localStorage.getItem("orders");
  if (ordersPreSaved) {
    const ordersPreSavedValue = JSON.parse(ordersPreSaved);
    for (var i = 0; i < ordersPreSavedValue.length; i++) {
      if (ordersPreSavedValue[i]._id == product._id) {
        console.log(
          product._id,
          ordersPreSavedValue[i]._id,
          ordersPreSavedValue[i]._id == product._id
        );
        if (operation == "increase") {
          ordersPreSavedValue[i].quantity++;
        } else {
          ordersPreSavedValue[i].quantity--;
        }
        localStorage.setItem("orders", JSON.stringify(ordersPreSavedValue));
      } else {
        const ordersToSave = [
          ...ordersPreSavedValue,
          {
            vendorId: vendor._id,
            vendorName: vendor.name,
            quantity: product.count,
            price: product.price,
            _id: product._id,
          },
        ];
        localStorage.setItem("orders", JSON.stringify(ordersToSave));
      }
    }
  } else {
    const ordersToSave = [
      {
        vendorId: vendor._id,
        vendorName: vendor.name,
        name: product.name,
        quantity: product.count,
        price: product.price,
        _id: product._id,
      },
    ];
    localStorage.setItem("orders", JSON.stringify(ordersToSave));
  }
};
