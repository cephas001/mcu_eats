import { db } from "../../utils/db";

// Infrastructure
import IndexedDBUserRepository from "../../infrastructure/repositories/IndexedDBUserRepository.js";
import IndexedDBProfileRepository from "../../infrastructure/repositories/IndexedDBProfileRepository.js";
import IndexedDBMessageRepository from "../../infrastructure/repositories/IndexedDBMessageRepository.js";

// User Use Cases
import storeUser from "../../../APPLICATION/usecases/user/repositories/browser/storeUser.js";
import retrieveUserById from "../../../APPLICATION/usecases/user/repositories/browser/retrieveUserById.js";
import clearUser from "../../../APPLICATION/usecases/user/repositories/browser/clearUser.js";

// Profile Use Cases
import storeUserProfile from "../../../APPLICATION/usecases/profile/repositories/browser/storeUserProfile.js";
import retrieveUserProfiles from "../../../APPLICATION/usecases/profile/repositories/browser/retrieveUserProfiles.js";
import clearUserProfiles from "../../../APPLICATION/usecases/profile/repositories/browser/clearUserProfiles.js";
import retrieveUserSelectedProfile from "../../../APPLICATION/usecases/profile/repositories/browser/retrieveUserSelectedProfile.js";
import selectUserProfile from "../../../APPLICATION/usecases/profile/repositories/browser/selectUserProfile.js";
import storeUserProfiles from "../../../APPLICATION/usecases/profile/repositories/browser/storeUserProfiles.js";
import overwriteStoredUserProfile from "../../../APPLICATION/usecases/profile/repositories/browser/overwriteStoredUserProfile.js";

// Vendor Profiles Use Cases
import storeVendorProfiles from "../../../APPLICATION/usecases/profile/repositories/browser/storeVendorProfiles.js";
import retrieveVendorProfiles from "../../../APPLICATION/usecases/profile/repositories/browser/retrieveVendorProfiles.js";
import clearVendorProfiles from "../../../APPLICATION/usecases/profile/repositories/browser/clearVendorProfiles.js";

export default defineNuxtPlugin(() => {
  const indexedDBUserRepo = new IndexedDBUserRepository(db);
  const indexedDBProfileRepo = new IndexedDBProfileRepository(db);
  const indexedDBMessageRepo = new IndexedDBMessageRepository(db);

  return {
    provide: {
      // User Use Cases
      storeUserUseCase: storeUser(indexedDBUserRepo),
      retrieveUserByIdUseCase: retrieveUserById(indexedDBUserRepo),
      clearUserUseCase: clearUser(indexedDBUserRepo),

      // Profile Use Cases
      storeUserProfileUseCase: storeUserProfile(
        indexedDBProfileRepo,
        indexedDBUserRepo
      ),
      retrieveUserProfilesUseCase: retrieveUserProfiles(indexedDBProfileRepo),
      clearUserProfilesUseCase: clearUserProfiles(indexedDBProfileRepo),
      retrieveUserSelectedProfileUseCase:
        retrieveUserSelectedProfile(indexedDBProfileRepo),
      selectUserProfileUseCase: selectUserProfile(indexedDBProfileRepo),
      storeUserProfilesUseCase: storeUserProfiles(
        indexedDBProfileRepo,
        indexedDBUserRepo
      ),
      overwriteStoredUserProfileUseCase: overwriteStoredUserProfile(
        indexedDBUserRepo,
        indexedDBProfileRepo
      ),

      // Vendor Profiles Use Cases
      storeVendorProfilesUseCase: storeVendorProfiles(indexedDBProfileRepo),
      retrieveVendorProfilesUseCase:
        retrieveVendorProfiles(indexedDBProfileRepo),
      clearVendorProfilesUseCase: clearVendorProfiles(indexedDBProfileRepo),
    },
  };
});
