export default class ProductBackend {
  constructor(api) {
    this.api = api;
  }

  // Create a new product
  async createProduct(formData) {
    try {
      return await this.api.request("/products", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      throw error;
    }
  }

  // Get product by ID
  async getProductById(productId) {
    try {
      return await this.api.request(`/products/${productId}`, {
        method: "GET",
      });
    } catch (error) {
      throw error;
    }
  }

  // Get products by category
  async getProductsByCategory(categoryId) {
    try {
      return await this.api.request(`/products/category/${categoryId}`, {
        method: "GET",
      });
    } catch (error) {
      throw error;
    }
  }

  // Get products by vendor
  async getProductsByVendor(vendorId) {
    try {
      return await this.api.request(`/products/vendor/${vendorId}`, {
        method: "GET",
      });
    } catch (error) {
      throw error;
    }
  }

  // Get all products that belong to a vendor
  async getAllVendorProducts(vendorId) {
    try {
      return await this.api.request(`/all-products/vendor/${vendorId}`, {
        method: "GET",
      });
    } catch (error) {
      throw error;
    }
  }

  // Search products
  async searchProducts(query) {
    try {
      return await this.api.request("/products/search", {
        method: "POST",
        body: { query },
      });
    } catch (error) {
      throw error;
    }
  }

  // Update product details
  async updateProduct(productId, updates) {
    try {
      return await this.api.request(`/products/${productId}`, {
        method: "PATCH",
        body: updates,
      });
    } catch (error) {
      throw error;
    }
  }

  // Set product availability
  async setProductAvailability(productId, available) {
    try {
      return await this.api.request(`/products/${productId}/availability`, {
        method: "PATCH",
        body: { available },
      });
    } catch (error) {
      throw error;
    }
  }

  // Delete a product
  async deleteProduct(productId) {
    try {
      return await this.api.request(`/products/${productId}`, {
        method: "DELETE",
      });
    } catch (error) {
      throw error;
    }
  }

  // Create a new combo
  async createCombo({ name, productIds, price, vendorId }) {
    try {
      return await this.api.request("/combos", {
        method: "POST",
        body: { name, productIds, price, vendorId },
      });
    } catch (error) {
      throw error;
    }
  }

  // List all combos
  async listCombos() {
    try {
      return await this.api.request("/combos", {
        method: "GET",
      });
    } catch (error) {
      throw error;
    }
  }

  // Update combo details
  async updateCombo(comboId, updates) {
    try {
      return await this.api.request(`/combos/${comboId}`, {
        method: "PATCH",
        body: updates,
      });
    } catch (error) {
      throw error;
    }
  }

  // Delete a combo
  async deleteCombo(comboId) {
    try {
      return await this.api.request(`/combos/${comboId}`, {
        method: "DELETE",
      });
    } catch (error) {
      throw error;
    }
  }
}
