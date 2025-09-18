import { db } from "@/utils/db";

import IndexedDBUserRepository from "@/infrastructure/repositories/IndexedDBUserRepository.js";

import * as UserUseCases from "../../../../APPLICATION/usecases/user/index.js";

export default defineNuxtPlugin(() => {
  const indexedDBUserRepo = new IndexedDBUserRepository(db);

  return {
    provide: {
      CreateUserUseCase: UserUseCases.CreateUser(indexedDBUserRepo),
      GetUserByIdUseCase: UserUseCases.GetUserById(indexedDBUserRepo),
      DeleteUserUseCase: UserUseCases.DeleteUser(indexedDBUserRepo),
    },
  };
});
