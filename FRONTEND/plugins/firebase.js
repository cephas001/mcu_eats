import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin(() => {
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

  return {
    provide: {
      firebaseAuth: auth,
    },
  };
});
