import ProductRepository from "../../../APPLICATION/interfaces/repositories/database/ProductRepository.js";
import renameMongoIdFields from "../presenters/renameMongoIdFields.js";

export default class MongoProductRepository extends ProductRepository {
  constructor(productRepo, vendorProfileRepo) {
    super();
    this.productRepo = productRepo;
    this.vendorProfileRepo = vendorProfileRepo;
  }

  async createProduct(product) {
    try {
      const productToSave = new this.productRepo(product);
      const savedProduct = await productToSave.save();

      return {
        product: renameMongoIdFields(savedProduct.toObject()),
        productId: savedProduct._id,
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(venodrId, productId) {}

  async findById(vendorId, productId) {}

  async checkMultipleProductsExistence(vendorId, productIds) {}

  async deleteMultipleProducts(vendorId, productIds) {}

  async getProductsByVendor(vendorId) {
    const products = await this.productRepo.find({ vendorId }).lean();

    return renameMongoIdFields(products);
  }

  async updateProduct({ vendorId, productId, productData }) {}
}
