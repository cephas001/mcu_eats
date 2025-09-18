import Dexie from "dexie";

class AppDB extends Dexie {
  constructor() {
    super("McuEatsDB");

    // Clear -> Cart, Favourite Products and Favourite Vendors when a user Logs Out
    this.version(1).stores({
      cart: "&_id, vendorId, vendorName, quantity, price, name, type",
      vendors:
        "&id, address, name, type, description, category, takingOrders, openingTime, closingTime, products, email, businessNumber",
      user: "id, name, email, phoneNumber, role, profiles, status, createdAt, updatedAt, lastLogin, category",
      profiles: "id, type, userId, createdAt, updatedAt",
      selectedProfile: "id, type, userId, data, createdAt, updatedAt",
      messages: "++id, message, type, createdAt",
    });
  }
}

export const db = new AppDB();
