import { db } from "../../utils/db";

import IndexedDBUserRepository from "../../infrastructure/repositories/IndexedDBUserRepository.js";
import IndexedDBProfileRepository from "../../infrastructure/repositories/IndexedDBProfileRepository.js";
import IndexedDBMessageRepository from "../../infrastructure/repositories/IndexedDBMessageRepository.js";

import storeUser from "../../../APPLICATION/usecases/user/repositories/local/storeUser.js";
import getUser from "../../../APPLICATION/usecases/user/repositories/local/getUser.js";
import clearUser from "../../../APPLICATION/usecases/user/repositories/local/clearUser.js";

import addProfile from "../../../APPLICATION/usecases/profile/repositories/local/addProfile.js";
import getProfiles from "../../../APPLICATION/usecases/profile/repositories/local/getProfiles.js";
import clearProfiles from "../../../APPLICATION/usecases/profile/repositories/local/clearProfiles.js";
import getSelectedProfile from "../../../APPLICATION/usecases/profile/repositories/local/getSelectedProfile.js";
import selectProfile from "../../../APPLICATION/usecases/profile/repositories/local/selectProfile.js";
import storeProfiles from "../../../APPLICATION/usecases/profile/repositories/local/storeProfiles.js";

export default defineNuxtPlugin(() => {
  const indexedDBUserRepo = new IndexedDBUserRepository(db);
  const indexedDBProfileRepo = new IndexedDBProfileRepository(db);
  const indexedDBMessageRepo = new IndexedDBMessageRepository(db);

  return {
    provide: {
      // User Use Cases
      storeUserUseCase: storeUser(indexedDBUserRepo),
      getUserUseCase: getUser(indexedDBUserRepo),
      clearUserUseCase: clearUser(indexedDBUserRepo),

      // Profile Use Cases
      addProfileUseCase: addProfile(indexedDBProfileRepo, indexedDBUserRepo),
      getProfilesUseCase: getProfiles(indexedDBProfileRepo),
      clearProfilesUseCase: clearProfiles(indexedDBProfileRepo),
      getSelectedProfileUseCase: getSelectedProfile(indexedDBProfileRepo),
      selectProfileUseCase: selectProfile(indexedDBProfileRepo),
      storeProfilesUseCase: storeProfiles(
        indexedDBProfileRepo,
        indexedDBUserRepo
      ),

      useIndexedDBUserRepo: indexedDBUserRepo,
      useIndexedDBProfileRepo: indexedDBProfileRepo,
      useIndexedDBMessageRepo: indexedDBMessageRepo,
    },
  };
});
