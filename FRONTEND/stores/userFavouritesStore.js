import { defineStore } from "pinia";
import { $fetch } from "ofetch";
import { useUserStore } from "@/stores/userStore";

export const useUserFavouritesStore = defineStore("userFavouritesStore", () => {
  const userStore = useUserStore();
  const { user } = storeToRefs(userStore);

  // Checks if a vendor is favourite or not
  const isFavouriteVendor = (id) => {
    if (!user.value) return false;

    const vendor = user.value.favouriteVendors.find((vendor) => {
      return vendor.vendor === id;
    });

    if (vendor) {
      return true;
    } else {
      return false;
    }
  };

  // Checks if a product is favourite or not
  const isFavouriteProduct = (id) => {
    if (!user.value) return false;

    const product = user.value.favouriteProduct.find((product) => {
      return product.productId == id;
    });

    if (product) {
      return true;
    } else {
      return false;
    }
  };

  // Favourites a Vendor
  const favouriteVendor = async (vendorId) => {
    try {
      const config = useRuntimeConfig();
      const token = useCookie("auth_token");
      
      if (!user.value._id) {
        await fetchUserDetails();
        if (!user.value._id) {
          return;
        }
      }
      var backendResponse = ref(null);
      if (favouriteOrNot(vendorId)) {
        backendResponse.value = await $fetch(
          `${config.public.apiBaseUrl}/users/favourites/${user.value._id}`,
          {
            method: "PUT",
            body: {
              removeFavouriteVendor: true,
              vendorId: vendorId,
            },
            headers: {
              Authorization: `Bearer ${token.value}`,
            },
          }
        );
      } else {
        backendResponse.value = await $fetch(
          `${config.public.apiBaseUrl}/users/favourites/${user.value._id}`,
          {
            method: "PUT",
            body: {
              favouriteVendors: [
                ...user.value.favouriteVendors,
                { vendor: vendorId },
              ],
            },
            headers: {
              Authorization: `Bearer ${token.value}`,
            },
          }
        );
      }

      if (backendResponse.value.user) {
        user.value = backendResponse.value.user;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isFavouriteVendor,
    isFavouriteProduct,
    favouriteVendor
  };
});
