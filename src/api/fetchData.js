export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response?.json();

    if (response?.ok && response?.status >= 200 && response?.status < 300) {
      return data;
    } else {
      throw Error("Fetch Error");
    }
  } catch (error) {
    console.log(error);
  }
};
