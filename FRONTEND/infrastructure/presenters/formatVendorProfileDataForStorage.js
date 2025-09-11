export const formatVendorProfileDataForStorage = (vendors) => {
  if (!Array.isArray(vendors)) {
    throw new Error("Vendor data must be an array");
  }

  return vendors.map((vendor) => {
    return {
      id: vendor.id,
      address: vendor.address,
      email: vendor.businessEmail,
      phoneNumber: vendor.businessNumber,
      category: vendor.category,
      closingTime: vendor.closingTime,
      description: vendor.description,
      openingTime: vendor.openingTime,
      takingOrders: vendor.takingOrders,
      name: vendor.vendorName,
      type: vendor.vendorType,
      products: vendor.products,
    };
  });
};
