// Validates email
export const checkFormEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (email == "" || email == undefined) {
    return "Please enter an email address";
  } else if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  } else {
    return "";
  }
};

// Validates first name
export const checkFormFirstName = (firstName) => {
  const nameRegex = /^[a-zA-z]+$/;

  if (firstName == "" || firstName == undefined) {
    return "Please enter a first name";
  } else if (!nameRegex.test(firstName)) {
    return "Please enter a valid first name";
  } else {
    return "";
  }
};

// Validates last name
export const checkFormLastName = (lastName) => {
  const nameRegex = /^[a-zA-z]+$/;

  if (lastName == "" || lastName == undefined) {
    return "Please enter a last name";
  } else if (!nameRegex.test(lastName)) {
    return "Please enter a valid last name";
  } else {
    return "";
  }
};

// Validates password
export const checkFormPassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (password == "" || password == undefined) {
    return "Please enter a password";
  } else if (!passwordRegex.test(password)) {
    return "stronger";
  } else {
    return "";
  }
};

// Validates confirm password
export const checkConfirmPassword = (password, confirmPassword) => {
  if (confirmPassword == "" || confirmPassword == undefined) {
    return "Please enter out this field";
  } else if (password !== confirmPassword) {
    return "Passwords do not match";
  } else {
    return "";
  }
};

// Validates room number
export const checkRoomNumber = (roomNumber) => {
  const roomNumberRegex = /^\d+$/;
  if (roomNumber == "" || roomNumber == undefined) {
    return "Please enter a room number";
  } else if (!roomNumberRegex.test(roomNumber)) {
    return "Please enter a valid room number";
  } else {
    return "";
  }
};
