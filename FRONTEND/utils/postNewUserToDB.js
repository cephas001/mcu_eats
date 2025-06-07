import { useNuxtApp } from "#app";

export const postNewUserToDB = async (
  user,
  firstDetails,
  additionalDetails,
  lecturer,
  token
) => {
  const nuxtApp = useNuxtApp();
  const config = useRuntimeConfig();

  // Getting primary user details
  const userToAdd = {
    id: user.uid,
    gender: `${additionalDetails.gender}`,
    email: user.email,
    emailVerified: user.email_verified,
    favourites: [],
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
