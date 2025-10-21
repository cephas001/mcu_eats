export default function CheckProductInCart(cartRepo) {
  return async function (cartId, productId) {
    try {
      const productInCart = await cartRepo.checkProductInCart(
        cartId,
        productId
      );
      return productInCart;
    } catch (error) {
      throw new Error("Error checking product in cart: " + error.message);
    }
  };
}
