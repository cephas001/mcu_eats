import { useCookie, useNuxtApp } from "#app";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { postNewUserToDB } from "../utils/postNewUserToDB";
import { useLogInStore } from "@/stores/logInStore";
import { storeToRefs } from "pinia";

export function useFirebaseAuthMethods() {
  const logInStore = useLogInStore();

  const { formState, additionalFormState, toggleNextForm } = useLogInStore();

  const {
    showAdditionalForm,
    showLecturerFields,
    signUpLogInErrors,
    tryingToSignIn,
    hideOptionToGoBack,
  } = storeToRefs(logInStore);

  // Google Sign In
  const socialSignIn = async (method) => {
    const { $firebaseAuth, $storeToken } = useNuxtApp();

    // Checks which service provider to use based on the method passed
    var provider;
    if (method == "google") {
      provider = new GoogleAuthProvider();
    } else if (method == "facebook") {
      provider = new FacebookAuthProvider();
    } else {
      return;
    }

    // Tries to use that provider to sign up/sign in the user
    try {
      tryingToSignIn.value = true;
      hideOptionToGoBack.value = true;
      const config = useRuntimeConfig();
      const result = await signInWithPopup($firebaseAuth, provider);
      const user = result.user;
      // After user is signed in or signed up, tries to check if the user is already saved in mongodb database
      const response = await $fetch(
        `${config.public.apiBaseUrl}/users/${user.uid}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      if (!response.found) {
        // If user is not yet saved
        $storeToken(user.accessToken);
        toggleNextForm();
        tryingToSignIn.value = false;
      } else {
        // If user is already saved just store token and return "redirect"
        $storeToken(user.accessToken);
        tryingToSignIn.value = false;
        return "redirect";
      }
    } catch (error) {
      tryingToSignIn.value = false;
      signUpLogInErrors.value = "An error occurred. Please try again";
    }
  };

  // Manual Sign Up
  const manualSignUp = async () => {
    const { $firebaseAuth } = useNuxtApp();

    try {
      tryingToSignIn.value = true;
      const userCredential = await createUserWithEmailAndPassword(
        $firebaseAuth,
        formState.email,
        formState.password
      );
      const user = userCredential.user;

      const response = await postNewUserToDB(
        user,
        formState,
        additionalFormState,
        showLecturerFields.value
      );
      if (response.added) {
        tryingToSignIn.value = false;
        return "redirect";
      } else {
        return response.message;
      }
    } catch (error) {
      tryingToSignIn.value = false;
      if (error.code == "auth/email-already-in-use") {
        signUpLogInErrors.value =
          "Email already in use. Please log in instead.";
      }
    }
  };

  // Manual Log In
  const manualLogIn = async () => {
    const { $firebaseAuth, $storeToken } = useNuxtApp();

    try {
      tryingToSignIn.value = true;
      const userCredential = await signInWithEmailAndPassword(
        $firebaseAuth,
        formState.email,
        formState.password
      );

      $storeToken(userCredential.user.accessToken);

      tryingToSignIn.value = false;
      return "redirect";
    } catch (error) {
      tryingToSignIn.value = false;

      if (error.code == "auth/invalid-credential") {
        signUpLogInErrors.value = "Invalid email or password";
      }
      console.log(error.code);
    }
  };

  return {
    socialSignIn,
    manualSignUp,
    manualLogIn,
  };
}
