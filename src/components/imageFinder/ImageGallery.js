import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Loader } from './Loader';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Modal } from './Modal';
import { Button } from './Button';
import { api } from 'service/api';

export const ImageGallery = ({ inputValue }) => {
  const [images, setImages] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [urlLarge, setUrlLarge] = useState('');
  const [page, setPage] = useState(1);
  const prevPage = usePrevious(page);
  const prevInputValue = usePrevious(inputValue);

  useEffect(() => {
    const fetchGallery = async (inputValue, page) => {
      setLoading(true);
      try {
        const result = await api(inputValue, page);
        const images = result.hits;
        if (result.total === 0) {
          alert('No images');
        }
        if (page === 1) {
          setImages([...images]);
        } else {
          setImages(prevState => [...prevState, ...images]);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (page > prevPage) {
      fetchGallery(inputValue, page);
      return;
    }

    if (prevInputValue !== inputValue && page === prevPage) {
      fetchGallery(inputValue, 1);
      resetPage();
      return;
    }
  }, [inputValue, page, prevPage, prevInputValue, error]);

  const resetPage = () => {
    setPage(1);
  };

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const openModal = contentModal => {
    setShowModal(true);
    setUrlLarge(contentModal);
  };

  const closeModal = () => {
    setShowModal(false);
    setUrlLarge({ urlLarge: '' });
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  return (
    <div>
      {!inputValue && <h2>Please, enter your request</h2>}
      {showModal && <Modal content={urlLarge} onClick={closeModal} />}
      {images && (
        <div>
          <ul className="gallery">
            {images.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                url={webformatURL}
                largeImageURL={largeImageURL}
                title={tags}
                onClick={openModal}
              />
            ))}
            ;
          </ul>
        </div>
      )}
      {loading && <Loader />}
      {images.length !== 0 && <Button onClick={loadMore} />};
    </div>
  );
};

ImageGallery.propTypes = {
  inputValue: PropTypes.string,
};
