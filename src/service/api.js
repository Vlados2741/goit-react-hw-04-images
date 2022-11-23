import axios from 'axios';

// const URL = 'https://pixabay.com/api/';
const KEY = '29359715-57cbbaa05904a72f5703b5006';
const PARAMETERS = 'image_type=photo&orientation=horizontal&per_page=12';
axios.defaults.baseUrl = 'https://pixabay.com/api/';
axios.defaults.params = {
  KEY: '29359715-57cbbaa05904a72f5703b5006',
  PARAMETERS: 'image_type=photo&orientation=horizontal&per_page=12',
};
export const api = async (inputValue, page) => {
  const response = await axios.get(
    `${URL}?q=${inputValue}&page=${page}&key=${{ KEY }}&${PARAMETERS}`
  );
  return response.data;
};
