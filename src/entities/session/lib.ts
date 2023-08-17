const DEFAULT = '😔';

const LETTERS_ONLY_REGEX = new RegExp('[^a-zA-Zа-яА-Я]', 'g');

const getFirstLetter = (str: string) =>
  str.replace(LETTERS_ONLY_REGEX, '').slice(0, 1).toUpperCase();

export const generateAvatarInitials = (firstName: string | null, lastName: string | null) => {
  const firstNameLetter = getFirstLetter(firstName ?? '');
  const lastNameLetter = getFirstLetter(lastName ?? '');

  if (!firstNameLetter && !lastNameLetter) {
    return DEFAULT;
  }

  return `${firstNameLetter}${lastNameLetter}`;
};
