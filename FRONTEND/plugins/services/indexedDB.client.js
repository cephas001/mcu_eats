import { db } from "../../utils/db";
import IndexedDBUserRepository from "../../infrastructure/repositories/IndexedDBUserRepository.js";
import IndexedDBProfileRepository from "../../infrastructure/repositories/IndexedDBProfileRepository.js";
import IndexedDBMessageRepository from "../../infrastructure/repositories/IndexedDBMessageRepository.js";

export default defineNuxtPlugin((nuxtApp) => {
  const indexedDBUserRepo = new IndexedDBUserRepository(db);
  const indexedDBProfileRepo = new IndexedDBProfileRepository(db);
  const indexedDBMessageRepo = new IndexedDBMessageRepository(db);
  return {
    provide: {
      useIndexedDBUserRepo: indexedDBUserRepo,
      useIndexedDBProfileRepo: indexedDBProfileRepo,
      useIndexedDBMessageRepo: indexedDBMessageRepo,
    },
  };
});
