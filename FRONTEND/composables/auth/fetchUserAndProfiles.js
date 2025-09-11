export const fetchUserAndProfiles = async (token) => {
  try {
    const { $expressAuthBackendService, $expressUserBackendService } =
      useNuxtApp();

    const user = await $expressAuthBackendService.login(token);

    const profileTypes = user.profiles.map((profile) => profile.type);

    const profiles = await $expressUserBackendService.getUserProfiles(
      user.id,
      profileTypes
    );

    return { user, profiles };
  } catch (error) {
    throw error;
  }
};
