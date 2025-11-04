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

  async deleteProduct(venodrId, productId) {
    try {
      const deletedProduct = await this.productRepo.findOneAndDelete({
        vendorId: venodrId,
        _id: productId,
      });

      return renameMongoIdFields(deletedProduct);
    } catch (error) {
      throw error;
    }
  }

  async findById(vendorId, productId) {
    try {
      const product = await this.productRepo
        .findOne({ vendorId, _id: productId })
        .lean();

      return renameMongoIdFields(product);
    } catch (error) {
      throw error;
    }
  }

  async checkMultipleProductsExistence(vendorId, productIds) {}

  async deleteMultipleProducts(vendorId, productIds) {
    try {
      const deleteResult = await this.productRepo.deleteMany({
        vendorId,
        _id: { $in: productIds },
      });

      return deleteResult.deletedCount == productIds.length;
    } catch (error) {
      throw error;
    }
  }

  async getProductsByVendor(vendorId) {
    const products = await this.productRepo.find({ vendorId }).lean();

    return renameMongoIdFields(products);
  }

  async updateProduct({ vendorId, productId, productData }) {}
}
