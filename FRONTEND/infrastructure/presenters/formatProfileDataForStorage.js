const returnFormattedObject = (profile) => {
  const { id, userId, type, createdAt, updatedAt, ...restOfProfile } = profile;

  return {
    id,
    userId,
    type,
    createdAt,
    updatedAt,
    data: restOfProfile,
  };
};

export const formatProfileDataForStorage = (profile) => {
  if (!profile) return null;

  if (Array.isArray(profile)) {
    if (profile.length === 0) return null;
    return profile.map((profileData) => returnFormattedObject(profileData));
  } else {
    return returnFormattedObject(profile);
  }
};
