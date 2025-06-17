import { defineStore } from "pinia";
import { db } from "../utils/db";

export const useCartStore = defineStore("cart", () => {
  const cart = ref([]);
  // Organized cart
  const finalCart = ref([]);
  const items = ref(0);
  const totalCartPrice = ref(0);
  const totalOrderAmount = ref(0);

  const deliveryFee = ref(500);
  const discount = ref(0);
  const serviceFee = ref(200);
  const subTotal = ref(0);

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

  const deleteFromCart = async (product) => {
    await db.cart.delete(product._id);
  };

  const setCart = (newCart) => {
    cart.value = newCart;
    totalCartPrice.value = 0;
  };

  const clearCart = async () => {
    cart.value = [];
    totalCartPrice.value = 0;
    await db.cart.clear();
  };

  const getCartValues = async () => {
    const indexDBCart = await db.cart.toArray();
    if (indexDBCart) {
      cart.value = indexDBCart;
    }
  };

  const computeTotalCartPrice = async () => {
    const indexDBCart = await db.cart.toArray();
    if (indexDBCart) {
      totalCartPrice.value = 0;
      items.value = 0;
      indexDBCart.forEach((item) => {
        items.value += item.quantity;
        totalCartPrice.value =
          totalCartPrice.value + item.quantity * item.price;
      });
      subTotal.value = totalCartPrice.value;
      totalOrderAmount.value =
        totalCartPrice.value +
        deliveryFee.value +
        serviceFee.value -
        discount.value;
    }
  };

  return {
    cart,
    totalCartPrice,
    subTotal,
    discount,
    serviceFee,
    deliveryFee,
    finalCart,
    items,
    totalOrderAmount,
    updateCart,
    setCart,
    deleteFromCart,
    clearCart,
    getCartValues,
    computeTotalCartPrice,
  };
});
