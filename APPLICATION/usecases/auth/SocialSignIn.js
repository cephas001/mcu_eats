import { UnexpectedError } from "../../domain/Error.js";

export default function SocialSignIn(socialSignInService) {
  return async function (provider) {
    try {
      const { user, id, token } = await socialSignInService.socialSignIn(
        provider
      );

      return { user, id, token };
    } catch (error) {
      throw new UnexpectedError(
        "An error occurred while signing the user in with social service providers.",
        error
      );
    }
  };
}
