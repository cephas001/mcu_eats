import { defineStore } from "pinia";

export const useCartStore = defineStore(
  "cart",
  () => {
    const cart = ref([]);
    // Organized cart
    const finalCart = ref([]);
    const items = ref(0);
    const totalCartPrice = ref(0);
    const totalOrderAmount = ref(0);

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
            type: product.type,
            _id: product._id,
          },
        ];
      }
    };

    const deleteFromCart = (product) => {
      totalCartPrice.value -= product.quantity * product.price;
      cart.value = cart.value.filter((item) => {
        if (item._id !== product._id) {
          return true;
        }
      });
    };

    const setCart = (newCart) => {
      cart.value = newCart;
      totalCartPrice.value = 0;
    };

    const clearCart = () => {
      cart.value = [];
      totalCartPrice.value = 0;
    };

    return {
      cart,
      totalCartPrice,
      finalCart,
      items,
      totalOrderAmount,
      updateCart,
      setCart,
      deleteFromCart,
      clearCart,
    };
  },
  {
    persist: {
      storage: localStorage,
    },
  }
);
