import { CartOperationError } from "../../domain/Error";
import { UpdateCartItemSchema } from "../../validators/cart/validateCartData.js";
import { inputErrorHandler } from "../../utils/errorHandler.js";

export default function UpdateCartItem(cartRepo) {
  return async function (cartId, productId, itemData) {
    const productInCart = await cartRepo.checkProductInCart(cartId, productId);

    if (!productInCart) {
      throw new CartOperationError(
        "Cannot update item that does not exist in the cart"
      );
    }

    const validatedItemData = inputErrorHandler(UpdateCartItemSchema, itemData);

    try {
      const { cartItem, cartItemId } = await cartRepo.updateCartItem(
        cartId,
        productId,
        validatedItemData
      );

      return { cartItem, cartItemId };
    } catch (error) {
      throw new CartOperationError(
        "An unexpected error occurred while trying to update the cart item",
        error
      );
    }
  };
}
