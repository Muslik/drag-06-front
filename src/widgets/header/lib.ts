const getFirstLetter = (str: string) => str.slice(0, 1).toUpperCase();

export const generateAvatarInitials = (firstName?: string | null, lastName?: string | null) => {
  const firstNameLetter = getFirstLetter(firstName ?? '');
  const lastNameLetter = getFirstLetter(lastName ?? '');

  if (!firstNameLetter && !lastNameLetter) {
    return null;
  }

  return `${firstNameLetter}${lastNameLetter}`;
};
