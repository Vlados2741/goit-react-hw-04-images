import axios from 'axios';

// const URL = 'https://pixabay.com/api/';
const KEY = '29359715-57cbbaa05904a72f5703b5006';
const PARAMETERS = 'image_type=photo&orientation=horizontal&per_page=12';
axios.defaults.baseUrl = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: KEY,
  image_type: photo,
  orientation: horizontal,
  per_page: 12,
};
export const api = async (inputValue, page) => {
  const response = await axios.get(
    `${baseUrl}?q=${inputValue}&page=${page}&${axios.defaults.params.key}&${axios.defaults.params.image_type}&${axios.defaults.params.orientation}&${axios.defaults.params.per_page}`
  );
  return response.data;
};
