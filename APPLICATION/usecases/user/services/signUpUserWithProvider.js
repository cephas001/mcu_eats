import { UnexpectedError } from "../../../domain/Error.js";

export default function signUpUserWithProvider(signUpService) {
  return async function (provider) {
    try {
      const { user, id, token } = await signUpService.signUpUserWithProvider(
        provider
      );

      return { user, id, token };
    } catch (error) {
      console.log(error);
      throw new UnexpectedError("Error while signing up");
    }
  };
}
