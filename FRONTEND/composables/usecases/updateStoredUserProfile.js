// DELETE IF NOT IN USE
export const updateStoredUserProfile = async (profileId, newProfileValue) => {
  const { $updateStoredUserProfileUseCase } = useNuxtApp();

  try {
    const profile = await $updateStoredUserProfileUseCase(
      profileId,
      newProfileValue
    );

    return profile;
  } catch (error) {
    throw error;
  }
};
