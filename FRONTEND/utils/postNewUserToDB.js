import { useNuxtApp } from "#app";

export const postNewUserToDB = async (
  user,
  formState,
  additionalFormState,
  lecturer
) => {
  const nuxtApp = useNuxtApp();
  const config = useRuntimeConfig();

  // Getting primary user details
  const userToAdd = {
    id: user.uid,
    gender: `${additionalFormState.gender}`,
    email: user.email,
    emailVerified: user.emailVerified,
    favourites: [],
    firstName: `${formState.firstName.trim()}`,
    lastName: `${formState.lastName.trim()}`,
    role: `${lecturer ? "Consumer" : additionalFormState.role}`,
  };

  var finalUserObject = {};

  if (lecturer) {
    const lecturerUser = {
      type: "lecturer",
      college: `${additionalFormState.college}`,
      officeNumber: additionalFormState.officeNumber,
    };
    finalUserObject = { ...userToAdd, ...lecturerUser };
  } else {
    const studentUser = {
      roomNumber: additionalFormState.roomNumber,
      hostel: `${additionalFormState.hostel}`,
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
    nuxtApp.$storeToken(user.accessToken);
    return { added: true, message: "Added successfully" };
  } else {
    signUpLogInErrors.value = response.message;
    return { added: false, message: response.message };
  }
};
