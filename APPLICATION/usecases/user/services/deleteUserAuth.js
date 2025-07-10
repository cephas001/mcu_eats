export default function deleteUserAuth(loginService) {
  return async function (id) {
    try {
      if (!id) {
        throw new Error("No id sent");
      }

      const user = await loginService.getUser(id);

      if (!user) {
        throw new Error("User does not exist");
      }

      await loginService.deleteUser(id);

      return user;
    } catch (error) {
      throw error;
    }
  };
}
