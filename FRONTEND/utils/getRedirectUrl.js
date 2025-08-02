export const getRedirectUrl = (selectedProfile) => {
  var redirectTo = undefined;

  switch (selectedProfile.type) {
    case "consumer":
      redirectTo = "/consumer";
      break;
    case "delivery_person":
      redirectTo = "/delivery-person";
      break;
    case "vendor":
      redirectTo = "/vendor";
    default:
      redirectTo = undefined;
  }

  return redirectTo;
};
