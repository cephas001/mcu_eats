export default class VendorBackend {
  constructor(api) {
    this.api = api;
  }

  // Create a new vendor
  async createVendor({ name, email, businessName, category }) {
    try {
      return await this.api.request("/vendors", {
        method: "POST",
        body: { name, email, businessName, category },
      });
    } catch (error) {
      throw error;
    }
  }

  // Get vendor by ID
  async getVendorById(vendorId) {
    try {
      return await this.api.request(`/vendors/${vendorId}`, {
        method: "GET",
      });
    } catch (error) {
      throw error;
    }
  }

  // Get all vendors
  async getVendors() {
    try {
      return await this.api.request("/vendors", {
        method: "GET",
      });
    } catch (error) {
      throw error;
    }
  }

  // Update vendor details
  async updateVendor(vendorId, updates) {
    try {
      return await this.api.request(`/vendors/${vendorId}`, {
        method: "PATCH",
        body: updates,
      });
    } catch (error) {
      throw error;
    }
  }

  // Update vendor availability
  async updateVendorAvailability(vendorId, available) {
    try {
      return await this.api.request(`/vendors/${vendorId}/availability`, {
        method: "PATCH",
        body: { available },
      });
    } catch (error) {
      throw error;
    }
  }

  // Delete a vendor
  async deleteVendor(vendorId) {
    try {
      return await this.api.request(`/vendors/${vendorId}`, {
        method: "DELETE",
      });
    } catch (error) {
      throw error;
    }
  }

  // Approve a vendor application
  async approveVendorApplication(vendorId) {
    try {
      return await this.api.request(`/vendors/${vendorId}/approve`, {
        method: "POST",
      });
    } catch (error) {
      throw error;
    }
  }

  // Reject a vendor application
  async rejectVendorApplication(vendorId, reason) {
    try {
      return await this.api.request(`/vendors/${vendorId}/reject`, {
        method: "POST",
        body: { reason },
      });
    } catch (error) {
      throw error;
    }
  }

  // Get all orders for a vendor
  async getVendorOrders(vendorId) {
    try {
      return await this.api.request(`/vendors/${vendorId}/orders`, {
        method: "GET",
      });
    } catch (error) {
      throw error;
    }
  }

  // Get all products for a vendor
  async getVendorProducts(vendorId) {
    try {
      return await this.api.request(`/vendors/${vendorId}/products`, {
        method: "GET",
      });
    } catch (error) {
      throw error;
    }
  }
}
