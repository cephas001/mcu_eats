import { clearUserAndProfilesUsecase } from "../usecases/clearUserAndProfiles";
import { clearUserAndProfilesState } from "../state/clearUserAndProfiles";

export const logoutUser = async () => {
  try {
    await $fetch("/api/logout");
  } catch (error) {
    throw error;
  }

  try {
    clearUserAndProfilesState();
  } catch (error) {
    throw error;
  }

  try {
    await clearUserAndProfilesUsecase();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
