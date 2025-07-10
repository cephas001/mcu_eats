export default function loginUser({ userRepo, loginService }) {
  return async function (token) {
    if (!token) {
      throw new Error("No token sent");
    }

    const { user, id } = await loginService.login(token);

    const existingUser = await userRepo.findById(id);

    if (!existingUser) {
      throw new Error("User does not exist");
    }

    return existingUser;
  };
}
