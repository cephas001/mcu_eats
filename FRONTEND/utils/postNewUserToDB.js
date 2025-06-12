import { useNuxtApp } from "#app";
import { useUserStore } from "@/stores/userStore";

export const postNewUserToDB = async (
  user,
  firstDetails,
  additionalDetails,
  lecturer,
  token
) => {
  const nuxtApp = useNuxtApp();
  const config = useRuntimeConfig();

  const userStore = useUserStore();

  // Getting primary user details
  const userToAdd = {
    id: user.uid,
    gender: `${additionalDetails.gender}`,
    email: user.email,
    emailVerified: user.email_verified,
    firstName: `${
      firstDetails.firstName && firstDetails.firstName != ""
        ? firstDetails.firstName.trim()
        : user.name.split(" ")[0]
    }`,
    lastName: `${
      firstDetails.lastName && firstDetails.lastName != ""
        ? firstDetails.lastName.trim()
        : user.name.split(" ")[1]
    }`,
    role: `${lecturer ? "Consumer" : additionalDetails.role}`,
  };

  var finalUserObject = {};

  if (lecturer) {
    const lecturerUser = {
      type: "lecturer",
      college: `${additionalDetails.college}`,
      officeNumber: additionalDetails.officeNumber,
    };
    finalUserObject = { ...userToAdd, ...lecturerUser };
  } else {
    const studentUser = {
      roomNumber: additionalDetails.roomNumber,
      hostel: `${additionalDetails.hostel}`,
      type: "Student",
    };
    finalUserObject = { ...userToAdd, ...studentUser };
  }

  // Posting entire user details
  const response = await $fetch(`${config.public.apiBaseUrl}/users`, {
    method: "POST",
    body: finalUserObject,
  });

  if (response.added) {
    userStore.setUser(response.user);
    userStore.setLoggedIn(true);
    if (user.accessToken) {
      nuxtApp.$storeToken(user.accessToken);
    } else {
      nuxtApp.$storeToken(token);
    }
    return { added: true, message: "Added successfully" };
  } else {
    return { added: false, message: response.message };
  }
};
