import BaseProfile from "./BaseProfile.js";

export default class DeliveryPersonProfile extends BaseProfile {
  constructor({
    id,
    userId,
    username,
    gender,
    hostel,
    roomNumber,
    college,
    department,
    matricNumber,
    available = false,
    penaltyPoints = 0,
    averageDeliveryTime = 1,
    location = { latitude: 0, longitude: 0 },
    accountDetails = {
      bankName: "",
      accountNumber: "",
      accountHolderName: "",
    },
    pendingOrders = [],
    activeOrders = [],
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    super({ id, userId, createdAt, updatedAt });

    this.type = "delivery_person";
    this.username = username;
    this.gender = gender;
    this.hostel = hostel;
    this.roomNumber = roomNumber;
    this.college = college;
    this.department = department;
    this.matricNumber = matricNumber;
    this.available = available;
    this.penaltyPoints = penaltyPoints;
    this.averageDeliveryTime = averageDeliveryTime;
    this.location = location;
    this.accountDetails = accountDetails;
    this.pendingOrders = pendingOrders;
    this.activeOrders = activeOrders;
  }
}
