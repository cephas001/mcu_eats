// DELETE IF NOT IN USE
export const updateStoredUserProfile = async (profileId, newProfileValue) => {
  const { $UpdateProfileUseCase } = useNuxtApp();

  try {
    const profile = await $UpdateProfileUseCase(profileId, newProfileValue);

    return profile;
  } catch (error) {
    throw error;
  }
};
