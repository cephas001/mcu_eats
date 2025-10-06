import ProductRepository from "../../../APPLICATION/interfaces/repositories/database/ProductRepository.js";
import renameMongoIdFields from "../presenters/renameMongoIdFields.js";

export default class MongoProductRepository extends ProductRepository {
  constructor(productRepo, vendorProfileRepo) {
    super();
    this.productRepo = productRepo;
    this.vendorProfileRepo = vendorProfileRepo;
  }

  async createProduct(vendorId, product) {
    try {
      const productToSave = {
        ...product,
        vendorId,
      }

      const product = new this.productRepo(productToSave);
      const savedProduct = await product.save();

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
