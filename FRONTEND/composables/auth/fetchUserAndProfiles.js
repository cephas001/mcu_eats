export const fetchUserAndProfiles = async (token) => {
  try {
    const { $expressAuthBackendService, $expressUserBackendService } =
      useNuxtApp();

    const user = await $expressAuthBackendService.login(token);

    const userProfileIds = user.profiles.map((profile) => profile.profileId);

    const profiles =
      await $expressUserBackendService.getProfilesDataByProfileIds(
        userProfileIds
      );

    return { user, profiles };
  } catch (error) {
    throw error;
  }
};
