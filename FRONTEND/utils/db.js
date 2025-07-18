import Dexie from "dexie";

class AppDB extends Dexie {
  constructor() {
    super("McuEatsDB");

    // Clear -> Cart, Favourite Products and Favourite Vendors when a user Logs Out
    this.version(10).stores({
      cart: "&_id, vendorId, vendorName, quantity, price, name, type",
      vendors:
        "&_id, name, type, description, category, taking_orders, opening_time, closing_time, products",
      favouriteProducts:
        "&_id, name, description, type, price, favourited, vendorName, vendorId, vendorOpeningTime, vendorClosingTime, vendorTakingOrders",
      favouriteVendors:
        "&_id, name, type, description, category, taking_orders, opening_time, closing_time, products",
      user: "id, name, email, phoneNumber, role, profiles, status, createdAt, updatedAt, lastLogin, category",
      profiles: "id, type, userId, data, createdAt, updatedAt",
      selectedProfile: "id, type, userId, data, createdAt, updatedAt",
      messages: "++id, message, type, createdAt",
    });
  }
}

export const db = new AppDB();
