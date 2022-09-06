export const getYearOfRelease = (element) => {
  const getDate = new Date(element);
  const year = getDate.getFullYear();
  return year;
};
