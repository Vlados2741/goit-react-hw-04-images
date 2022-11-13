import { useState } from 'react';
import { Searchbar } from './imageFinder/Searchbar';
import { ImageGallery } from './imageFinder/ImageGallery';
import './imageFinder/imageFinder-style.css';
export const App = () => {
  const [inputValue, setInputValue] = useState('');

  const onFormSubmit = inputValue => {
    setInputValue(inputValue);
  };

  return (
    <div>
      <Searchbar onSubmit={onFormSubmit} />

      <ImageGallery inputValue={inputValue} />
    </div>
  );
};
