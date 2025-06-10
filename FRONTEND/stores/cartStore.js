import { defineStore } from "pinia";

export const useCartStore = defineStore(
  "cart",
  () => {
    const cart = ref([]);
    const totalCartPrice = ref(0);
    const viewCartBtn = ref(false);

    const updateCart = (product, vendorId, vendorName, operation) => {
      if (operation == "increase") {
        product.count++;

        totalCartPrice.value = totalCartPrice.value + product.price;
      } else {
        product.count--;
        totalCartPrice.value = totalCartPrice.value - product.price;
        if (product.count == 0) {
          console.log("here");
          cart.value = cart.value.filter((item) => {
            if (item._id !== product._id) {
              return true;
            }
          });
          return;
        }
      }
      const storedProduct = cart.value.find((sProduct) => {
        return sProduct._id === product._id;
      });
      if (storedProduct) {
        cart.value = cart.value.map((item) => {
          if (product._id == item._id) {
            return { ...item, quantity: product.count };
          } else {
            return { ...item };
          }
        });
      } else {
        cart.value = [
          ...cart.value,
          {
            vendorId: vendorId,
            vendorName: vendorName,
            quantity: product.count,
            price: product.price,
            name: product.name,
            _id: product._id,
          },
        ];
      }
    };

    const setCart = (newCart) => {
      cart.value = newCart;
      totalCartPrice.value = 0;
    };

    return {
      cart,
      updateCart,
      setCart,
      totalCartPrice,
    };
  },
  {
    persist: {
      storage: localStorage,
    },
  }
);
