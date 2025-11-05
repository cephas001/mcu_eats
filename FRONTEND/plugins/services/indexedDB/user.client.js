import { db } from "@/utils/db";

import IndexedDBUserRepository from "@/infrastructure/repositories/IndexedDBUserRepository.js";

import * as UserUseCases from "../../../../APPLICATION/usecases/user/index.js";
import * as ClientUserUseCases from "../../../../APPLICATION/usecases/client_user/index.js";

export default defineNuxtPlugin(() => {
  const indexedDBUserRepo = new IndexedDBUserRepository(db);

  return {
    provide: {
      CreateUserUseCase: ClientUserUseCases.CreateUser(indexedDBUserRepo),
      GetUserByIdUseCase: UserUseCases.GetUserById(indexedDBUserRepo),
      DeleteUserUseCase: UserUseCases.DeleteUser(indexedDBUserRepo),
    },
  };
});
