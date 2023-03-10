export const buildUrlPath = (stringToBeFormatted: string): string => {
  const urlFormatted = stringToBeFormatted
    .toLocaleLowerCase()
    .replaceAll(" ", "_")
    .replaceAll("/", "-")
    .replaceAll(/--/g, "-");

  return urlFormatted;
};
