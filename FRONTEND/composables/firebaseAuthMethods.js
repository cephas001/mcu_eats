import { navigateTo, useNuxtApp } from "#app";
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
import { useUserStore } from "@/stores/userStore";

export function useFirebaseAuthMethods() {
  const logInStore = useLogInStore();
  const userStore = useUserStore();
  const { formState, additionalFormState, toggleNextForm } = useLogInStore();

  const {
    showLecturerFields,
    signUpLogInErrors,
    tryingToSignIn,
    hideOptionToGoBack,
  } = storeToRefs(logInStore);

  // Function that POSTs to /login and sets a cookie
  const backendLogin = async (token, user) => {
    const config = useRuntimeConfig();
    const response = await $fetch("/api/login", {
      method: "POST",
      body: {
        token,
      },
    });

    if (response.message == "Success") {
      // Sets the user in session storage
      userStore.setUser(user);
      await navigateTo("/");
    } else {
      throw new Error("Backend error occurred");
    }
  };

  // Google and Facebook Sign In
  const socialSignIn = async (method) => {
    const { $firebaseAuth } = useNuxtApp();

    // Checks which service provider to use based on the method passed
    var provider;
    if (method == "google") {
      provider = new GoogleAuthProvider();
    } else if (method == "facebook") {
      provider = new FacebookAuthProvider();
    } else {
      throw new Error("No authentication provider chosen");
    }

    // Tries to use that provider to sign up/sign in the user
    try {
      tryingToSignIn.value = true;
      hideOptionToGoBack.value = true;
      const config = useRuntimeConfig();
      const result = await signInWithPopup($firebaseAuth, provider);
      const user = result.user;

      // After user is signed in, checks if the user is already saved in mongodb database
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
        toggleNextForm();
        tryingToSignIn.value = false;
        return;
      }

      // If user is already saved, try our own backend login
      await backendLogin(user.token, response.user);
    } catch (error) {
      console.log(error);
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
        // Once user is saved, try our own backend login
        await backendLogin(user.accessToken, response.user);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      tryingToSignIn.value = false;
      if (error.code == "auth/email-already-in-use") {
        signUpLogInErrors.value =
          "Email already in use. Please log in instead.";
        return;
      }
      signUpLogInErrors.value = "An error occurred. Please try again";
    }
  };

  // Manual Log In
  const manualLogIn = async () => {
    const { $firebaseAuth } = useNuxtApp();
    const config = useRuntimeConfig();

    try {
      tryingToSignIn.value = true;
      const userCredential = await signInWithEmailAndPassword(
        $firebaseAuth,
        formState.email,
        formState.password
      );

      if (userCredential.user.accessToken) {
        // After user is signed in, checks if the user is already saved in mongodb database
        const response = await $fetch(
          `${config.public.apiBaseUrl}/users/${userCredential.user.uid}`,
          {
            headers: {
              Authorization: `Bearer ${userCredential.user.accessToken}`,
            },
          }
        );

        if (response.found) {
          await backendLogin(userCredential.user.accessToken, response.user);
        } else {
          throw new Error(
            "User does not exist in database, please contact admin"
          );
        }
      }
    } catch (error) {
      tryingToSignIn.value = false;

      if (error.code == "auth/invalid-credential") {
        signUpLogInErrors.value = "Invalid email or password";
        return;
      }
      console.log(error);
      signUpLogInErrors.value = "An error occurred. Please try again later.";
    }
  };

  return {
    socialSignIn,
    manualSignUp,
    manualLogIn,
  };
}
