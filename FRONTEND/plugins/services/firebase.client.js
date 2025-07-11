import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import FirebaseAuthService from "../../infrastructure/services/FirebaseAuthService.js";
import signUpUserWithEmailAndPassword from "../../../APPLICATION/usecases/user/services/signUpUserWithEmailAndPassword.js";
import signUpUserWithProvider from "../../../APPLICATION/usecases/user/services/signUpUserWithProvider.js";
import loginUserWithEmailAndPassword from "../../../APPLICATION/usecases/user/services/loginUserWithEmailAndPassword.js";

import ExpressUserBackend from "../../infrastructure/backend/ExpressUserBackend.js";
import { createApiClient } from "~/utils/api";

export default defineNuxtPlugin((nuxtApp) => {
  const firebaseConfig = {
    apiKey: useRuntimeConfig().public.FIREBASE_API_KEY,
    authDomain: useRuntimeConfig().public.FIREBASE_AUTH_DOMAIN,
    projectId: useRuntimeConfig().public.FIREBASE_PROJECT_ID,
    storageBucket: useRuntimeConfig().public.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: useRuntimeConfig().public.FIREBASE_MESSAGING_SENDER_ID,
    appId: useRuntimeConfig().public.FIREBASE_APP_ID,
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const api = createApiClient();
  const expressUserBackendService = new ExpressUserBackend(api);

  const authService = new FirebaseAuthService(auth, expressUserBackendService);

  return {
    provide: {
      useSignUpUserWithEmailAndPasswordUseCase:
        signUpUserWithEmailAndPassword(authService),
      useLoginUserWithEmailAndPasswordUseCase:
        loginUserWithEmailAndPassword(authService),
      useSignUpUserWithProviderUseCase: signUpUserWithProvider(authService),
    },
  };
});
