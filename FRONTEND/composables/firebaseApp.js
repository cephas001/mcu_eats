import { initializeApp } from "firebase/app";

export default function () {
  const firebaseConfig = {
    apiKey: useRuntimeConfig().public.FIREBASE_API_KEY,
    authDomain: useRuntimeConfig().public.FIREBASE_AUTH_DOMAIN,
    projectId: useRuntimeConfig().public.FIREBASE_PROJECT_ID,
    storageBucket: useRuntimeConfig().public.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: useRuntimeConfig().public.FIREBASE_MESSAGING_SENDER_ID,
    appId: useRuntimeConfig().public.FIREBASE_APP_ID,
  };

  const app = initializeApp(firebaseConfig);

  return {
    app,
  };
}
