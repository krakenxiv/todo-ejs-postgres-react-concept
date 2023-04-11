export const timestampToDateConvert = (timestampToConvert: number): string => {
  const convertedDate = new Date(timestampToConvert);
  return convertedDate.toLocaleString();
};
