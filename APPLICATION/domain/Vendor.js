import BaseProfile from "./BaseProfile.js";

export default class Vendor extends BaseProfile {
  constructor({
    id,
    userId,
    vendorName,
    vendorType,
    description,
    businessNumber,
    businessEmail,
    category,
    takingOrders = false,
    openingTime = { hour: 0, minute: 0 },
    closingTime = { hour: 0, minute: 0 },
    address,
    products = [], // ARRAY OF VENDOR PRODUCTS IDS
    verificationStatus = "pending",
    location = { latitude: 0, longitude: 0 },
    accountDetails = {
      bankName: "",
      accountNumber: "",
      accountHolderName: "",
    },
    pendingOrders = [], // ARRAY OF ORDER IDS
    activeOrders = [], // ARRAY OF ORDER IDS
    completedOrders = [], // ARRAY OF ORDER IDS
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    super({ id, userId, createdAt, updatedAt, type: "vendor" });

    this.vendorName = vendorName;
    this.vendorType = vendorType;
    this.description = description;
    this.businessNumber = businessNumber;
    this.businessEmail = businessEmail;
    this.category = category;
    this.takingOrders = takingOrders;
    this.openingTime = openingTime;
    this.closingTime = closingTime;
    this.address = address;
    this.products = products;
    this.verificationStatus = verificationStatus;
    this.location = location;
    this.accountDetails = accountDetails;
    this.pendingOrders = pendingOrders;
    this.activeOrders = activeOrders;
    this.completedOrders = completedOrders;
  }
}
