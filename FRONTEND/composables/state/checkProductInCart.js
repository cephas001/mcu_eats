import { useCartStore } from "@/stores/cartStore";

export const checkProductInCart = async (id) => {
  const cartStore = useCartStore();
  const { $CheckProductInCartUseCase } = useNuxtApp();

  let productIsPresent = false;

  try {
    productIsPresent = cartStore.checkItemInCart(id);

    if (productIsPresent) {
      return true;
    }
  } catch (error) {
    throw error;
  }

  try {
    productIsPresent = await $CheckProductInCartUseCase(null, id);
  } catch (error) {
    throw error;
  } finally {
    return productIsPresent;
  }
};
