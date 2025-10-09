import express from "express";
const router = express.Router();

import verifyToken from "../middlewares/verifyToken.js";

import {
  CreateComboUseCase,
  CreateProductUseCase,
  DeleteComboUseCase,
  DeleteProductUseCase,
  GetProductByIdUseCase,
  GetProductsByCategoryUseCase,
  GetProductsByVendorUseCase,
  GetAllVendorProductsUseCase,
  ListCombosUseCase,
  SearchProductsUseCase,
  SetProductAvailaibiltyUseCase,
  UpdateComboUseCase,
  UpdateProductUseCase,
} from "../services/index.js";

// Create a new product
router.post("/products", verifyToken, async (req, res, next) => {
  try {
    const { vendorId, productData } = req.body;
    const { updatedVendor, createdProduct, createdProductId } =
      await CreateProductUseCase({
        userId: req.user.id,
        vendorId,
        productData,
      });
    res.status(201).json({ updatedVendor, createdProduct, createdProductId });
  } catch (error) {
    next(error);
  }
});

// Get product by ID
router.get("/products/:productId", async (req, res, next) => {
  try {
    const product = await GetProductByIdUseCase(req.params.productId);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// Get products by category
router.get("/products/category/:categoryId", async (req, res, next) => {
  try {
    const products = await GetProductsByCategoryUseCase(req.params.categoryId);
  } catch (error) {
    next(error);
  }
});

// Get products by vendor
router.get("/products/vendor/:vendorId", async (req, res, next) => {
  try {
    const products = await GetProductsByVendorUseCase(req.params.vendorId);
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// Get all products that belong to a vendor
router.get(
  "/all-products/vendor/:vendorId",
  verifyToken,
  async (req, res, next) => {
    try {
      const products = await GetAllVendorProductsUseCase({
        userId: req.user.id,
        vendorId: req.params.vendorId,
      });
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
);

// Search products
router.post("/products/search", async (req, res, next) => {
  try {
    const { query } = req.body;
    const results = await SearchProductsUseCase(query);
    res.json(results);
  } catch (error) {
    next(error);
  }
});

// Update product details
router.patch("/products/:productId", verifyToken, async (req, res, next) => {
  try {
    const { updates, vendorId } = req.body;
    const updatedProduct = await UpdateProductUseCase({
      userId: req.user.id,
      productId: req.params.productId,
      productData: updates,
      vendorId,
    });
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

// Set product availability
router.patch("/products/:productId/availability", async (req, res, next) => {
  try {
    const { available } = req.body;
    await SetProductAvailaibiltyUseCase(req.params.productId, available);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Delete a product
router.delete("/products/:productId", verifyToken, async (req, res, next) => {
  try {
    const { vendorId } = req.body;
    await DeleteProductUseCase({
      userId: req.user.id,
      vendorId,
      productId: req.params.productId,
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Create a new combo
router.post("/combos", async (req, res, next) => {
  try {
    const { name, productIds, price, vendorId } = req.body;
    const combo = await CreateComboUseCase({
      name,
      productIds,
      price,
      vendorId,
    });
    res.status(201).json(combo);
  } catch (error) {
    next(error);
  }
});

// List all combos
router.get("/combos", async (req, res, next) => {
  try {
    const combos = await ListCombosUseCase();
    res.json(combos);
  } catch (error) {
    next(error);
  }
});

// Update combo details
router.patch("/combos/:comboId", async (req, res, next) => {
  try {
    const updates = req.body;
    const updatedCombo = await UpdateComboUseCase(req.params.comboId, updates);
    res.json(updatedCombo);
  } catch (error) {
    next(error);
  }
});

// Delete a combo
router.delete("/combos/:comboId", async (req, res, next) => {
  try {
    await DeleteComboUseCase(req.params.comboId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

export default router;
