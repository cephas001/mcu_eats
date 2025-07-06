export const postNewUserToDB = async (
  user,
  firstDetails,
  additionalDetails,
  lecturer
) => {
  const config = useRuntimeConfig();

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

  return {
    added: response.added,
    message: "Added successfully",
    user: response?.user,
  };
};
