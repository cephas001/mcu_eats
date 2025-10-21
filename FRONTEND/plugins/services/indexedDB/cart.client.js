import { db } from "@/utils/db";

import IndexedDBCartRepository from "@/infrastructure/repositories/IndexedDBCartRepository.js";

// Client-Specific UseCases
import * as ClientCartUseCases from "../../../../APPLICATION/usecases/client_cart/index.js";
// Generally Applicable UseCases
import * as CartUseCases from "../../../../APPLICATION/usecases/cart/index.js";

export default defineNuxtPlugin(() => {
  const indexedDBCartRepo = new IndexedDBCartRepository(db);

  return {
    provide: {
      // Client-Specific UseCases
      AddItemToCartUseCase: ClientCartUseCases.AddItemToCart(indexedDBCartRepo),
      UpdateCartItemUseCase:
        ClientCartUseCases.UpdateCartItem(indexedDBCartRepo),
      // Generally Applicable UseCases
      CheckProductInCartUseCase:
        CartUseCases.CheckProductInCart(indexedDBCartRepo),
      GetProductInCartUseCase: CartUseCases.GetProductInCart(indexedDBCartRepo),
    },
  };
});
