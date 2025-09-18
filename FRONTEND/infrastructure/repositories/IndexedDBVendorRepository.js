import VendorRepository from "../../../APPLICATION/interfaces/repositories/browser/VendorRepository";
import { stringifyArrays } from "../../utils/stringifyArrays.js";
import { parseArrays } from "../../utils/parseArrays.js";

export default class IndexedDBVendorRepository extends VendorRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async getVendors() {
    try {
      const vendorProfiles = await this.db.vendors.toArray();
      if (vendorProfiles && vendorProfiles.length > 0) {
        const profilesToReturn = vendorProfiles.map((profile) =>
          parseArrays(profile)
        );
        return profilesToReturn;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async createVendors(vendorProfiles) {
    try {
      const stringifiedVendorProfiles = vendorProfiles.map((profileData) =>
        stringifyArrays(profileData)
      );

      await this.db.vendors.bulkPut(stringifiedVendorProfiles);

      return parseArrays(await this.db.vendors.toArray());
    } catch (error) {
      throw error;
    }
  }
}
