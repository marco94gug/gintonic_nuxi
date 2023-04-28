export const buildUrlPath = (
  stringToBeFormatted: string | undefined
): string => {
  const urlFormatted = (stringToBeFormatted as string)
    .toLocaleLowerCase()
    .replaceAll(" ", "_")
    .replaceAll("/", "-")
    .replaceAll(/--/g, "-");

  return urlFormatted;
};
