import Dexie from "dexie";

class AppDB extends Dexie {
  constructor() {
    super("McuEatsDB");

    this.version(2).stores({
      cartItems: "productId, vendorName, quantity, unitPrice",
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
