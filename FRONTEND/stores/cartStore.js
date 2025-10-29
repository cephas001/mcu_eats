import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", () => {
  const cart = ref([]);

  // Delete later
  const totalOrderAmount = ref(0);

  const addToCart = (item) => {
    cart.value.push(item);
  };

  const totalCartPrice = computed(() => {
    return cart.value.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0
    );
  });

  const setCart = (newCart) => {
    cart.value = newCart;
    totalCartPrice.value = 0;
  };

  const addItemToCart = (item) => {
    cart.value.push(item);
  };

  const updateItemInCart = (productId, updatedItem) => {
    cart.value = cart.value.map((item) =>
      item.productId === productId ? { ...item, ...updatedItem } : item
    );
  };
  const clearCart = () => {
    cart.value = [];
    totalCartPrice.value = 0;
  };

  const getCart = () => {
    return cart.value;
  };

  const checkItemInCart = (productId) => {
    return (
      cart.value.find((item) => item.productId === productId) !== undefined
    );
  };

  const getProductInCart = (productId) => {
    return cart.value.find((item) => item.productId === productId);
  };

  return {
    cart,
    totalCartPrice,
    addToCart,
    setCart,
    clearCart,
    getCart,
    checkItemInCart,
    getProductInCart,
    addItemToCart,
    updateItemInCart,
    totalOrderAmount,
  };
});
