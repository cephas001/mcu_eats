import { useCartStore } from "@/stores/cartStore";

export const getProductInCart = async (id) => {
  const cartStore = useCartStore();
  const { $GetProductInCartUseCase } = useNuxtApp();

  let product = null;

  try {
    product = cartStore.getProductInCart(id);

    if (product) {
      return true;
    }
  } catch (error) {
    throw error;
  }

  try {
    product = await $GetProductInCartUseCase(null, id);
  } catch (error) {
    throw error;
  } finally {
    return product;
  }
};
