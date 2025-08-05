export const vendorProfilePresenter = (vendors) => {
  if (!Array.isArray(vendors)) {
    throw new Error("Vendor data must be an array");
  }

  return vendors.map((vendor) => {
    const data = vendor.data;
    return {
      id: vendor._id,
      address: data.address,
      businessEmail: data.businessEmail,
      businessNumber: data.businessNumber,
      category: data.category,
      closingTime: data.closingTime,
      description: data.description,
      openingTime: data.openingTime,
      takingOrders: data.takingOrders,
      vendorName: data.vendorName,
      vendorType: data.vendorType,
      products: data.products,
    };
  });
};
