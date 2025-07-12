import { db } from "../../utils/db";
import IndexedDBUserRepository from "../../infrastructure/repositories/IndexedDBUserRepository.js";
import IndexedDBProfileRepository from "../../infrastructure/repositories/IndexedDBProfileRepository.js";

export default defineNuxtPlugin((nuxtApp) => {
  const indexedDBUserRepo = new IndexedDBUserRepository(db);
  const indexedDBProfileRepo = new IndexedDBProfileRepository(db);

  return {
    provide: {
      useIndexedDBUserRepo: indexedDBUserRepo,
      useIndexedDBProfileRepo: indexedDBProfileRepo,
    },
  };
});
