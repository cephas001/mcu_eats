import { db } from "@/utils/db";

import IndexedDBUserRepository from "@/infrastructure/repositories/IndexedDBUserRepository.js";
import IndexedDBProfileRepository from "@/infrastructure/repositories/IndexedDBProfileRepository.js";

// Client-Specific UseCases
import * as ClientProfileUseCases from "../../../../APPLICATION/usecases/client_profile/index.js";
// Generally Applicable UseCases
import * as ProfileUseCases from "../../../../APPLICATION/usecases/profile/index.js";

export default defineNuxtPlugin(() => {
  const indexedDBUserRepo = new IndexedDBUserRepository(db);
  const indexedDBProfileRepo = new IndexedDBProfileRepository(db);

  return {
    provide: {
      CreateUserProfileUseCase: ClientProfileUseCases.CreateUserProfile(
        indexedDBProfileRepo,
        indexedDBUserRepo
      ),
      DeleteUserProfiles:
        ClientProfileUseCases.DeleteUserProfiles(indexedDBProfileRepo),
      GetSelectedProfileUseCase:
        ClientProfileUseCases.GetSelectedProfile(indexedDBProfileRepo),

      SelectUserProfileUseCase:
        ClientProfileUseCases.SelectUserProfile(indexedDBProfileRepo),
      CreateUserProfilesUseCase: ClientProfileUseCases.CreateUserProfiles(
        indexedDBProfileRepo,
        indexedDBUserRepo
      ),
      UpdateProfileUseCase: ClientProfileUseCases.UpdateProfile(
        indexedDBUserRepo,
        indexedDBProfileRepo
      ),

      GetUserProfilesUseCase: ProfileUseCases.GetUserProfiles(
        indexedDBUserRepo,
        indexedDBProfileRepo
      ),
    },
  };
});
