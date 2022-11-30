const KEY = '29359715-57cbbaa05904a72f5703b5006';

export const api = async (inputValue, page) => {
  const response = await fetch(
    `https://pixabay.com/api/?key=${KEY}&q=${inputValue}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  );
  const images = await response.json();
  return images;
};
