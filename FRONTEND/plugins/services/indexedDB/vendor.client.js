import { db } from "@/utils/db";

import IndexedDBVendorRepository from "@/infrastructure/repositories/IndexedDBVendorRepository.js";

// Client-Specific UseCases
import * as ClientVendorUseCases from "../../../../APPLICATION/usecases/client_vendor/index.js";
// Generally Applicable UseCases
import * as VendorUseCases from "../../../../APPLICATION/usecases/vendor/index.js";

export default defineNuxtPlugin(() => {
  const indexedDBVendorRepo = new IndexedDBVendorRepository(db);

  return {
    provide: {
      // Vendor Profiles Use Cases
      CreateVendorsUseCase:
        ClientVendorUseCases.CreateVendors(indexedDBVendorRepo),
      GetVendorsUseCase: ClientVendorUseCases.GetVendors(indexedDBVendorRepo),
    },
  };
});
