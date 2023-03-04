export const buildUrlPath = (categoryString: string): string => {
  const urlFormatted = categoryString
    .toLocaleLowerCase()
    .replaceAll(" ", "_")
    .replaceAll("/", "-")
    .replaceAll(/--/g, "-");

  return urlFormatted;
};
