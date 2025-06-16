import Dexie from "dexie";

class AppDB extends Dexie {
  constructor() {
    super("McuEatsDB");

    this.version(2).stores({
      cart: "&_id, vendorId, vendorName, quantity, price, name, type",
      vendors:
        "&_id, name, type, description, category, taking_orders, opening_time, closing_time, products",
    });
  }
}

export const db = new AppDB();
