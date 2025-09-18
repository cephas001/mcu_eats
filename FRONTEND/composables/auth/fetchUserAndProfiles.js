export const fetchUserAndProfiles = async (token) => {
  try {
    const { $authApiService, $profileApiService } = useNuxtApp();

    const user = await $authApiService.login(token);

    const profiles = await $profileApiService.getUserProfiles(user?.id);

    return { user, profiles };
  } catch (error) {
    throw error;
  }
};
