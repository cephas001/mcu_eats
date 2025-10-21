export default function GetProductInCart(cartRepo) {
  return async function (cartId, productId) {
    try {
      const product = await cartRepo.getProductInCart(cartId, productId);
      return product;
    } catch (error) {
      throw new Error("Error checking product in cart: " + error.message);
    }
  };
}
