import CartItem from "../../domain/CartItem.js";
import { CartItemSchema } from "../../validators/cart/validateCartData";

import { inputErrorHandler } from "../../utils/errorHandler.js";
import { CartOperationError } from "../../domain/Error.js";

export default function AddItemToCart(cartRepo) {
  return async function (cartId, itemData) {
    const validatedItemData = inputErrorHandler(CartItemSchema, itemData);

    try {
      const cartItemToSave = new CartItem(validatedItemData);

      const { cartItem, cartItemId } = await cartRepo.addItemToCart(
        cartId,
        cartItemToSave
      );

      return { cartItem, cartItemId };
    } catch (error) {
      throw new CartOperationError(
        "An unexpected error occurred while trying to add an item to the cart",
        error
      );
    }
  };
}
