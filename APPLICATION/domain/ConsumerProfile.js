import BaseProfile from "./BaseProfile.js";

export default class ConsumerProfile extends BaseProfile {
  constructor({
    id,
    userId,
    createdAt,
    updatedAt,
    username,
    gender,
    hostel,
    roomNumber,
    college,
    officeNumber,
    favorites = [],
    addresses = [],
    notes = [],
  }) {
    super({ id, userId, createdAt, updatedAt });

    this.type = "consumer";
    this.username = username;
    this.gender = gender;
    this.hostel = hostel;
    this.roomNumber = roomNumber;
    this.college = college;
    this.officeNumber = officeNumber;
    this.favorites = favorites;
    this.addresses = addresses;
    this.notes = notes;
  }
}
