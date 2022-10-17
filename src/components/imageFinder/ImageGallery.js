import { useState, useEffect} from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import { Loader } from "./Loader";
import { ImageGalleryItem } from "./ImageGalleryItem";
import { Modal } from "./Modal";
import { Button } from "./Button";


export const ImageGallery = (props) => {
    const [images, setImages] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [contentModal, setContentModal] = useState({urlLarge: ''})
    const [page, setPage] = useState(1)
    
    useEffect(() => {
        const KEY = '29230090-341e91ba352ddd311dc4a279b';
        const value = props.inputValue;
            setImages('');
            setLoading(true);
            setContentModal('');
            setPage(1)
            fetchImages(KEY, value, page);
        if (value === value &&
            page > page) {

            setLoading(true);

            this.fetchImages(KEY, value, page);
        };
    });
    
    const fetchImages = async (KEY, value, page) => {
     try {
                const response = await axios.get(
                    `https://pixabay.com/api/?key=${KEY}&q=${value}&page=${page}&image_type=photo&per_page=12`
                );

                if (response.data.total === 0) {
                    alert("No results")
                    setPage(1)
                };
                return setImages([...images, ...response.data.hits])
            }
            catch (error) {
                setError 
            }
            finally {
                setLoading(false);
            }
    };

    const openModal = contentModal => {
        setShowModal(true)
        setContentModal(contentModal)
    };

    const closeModal = () => {
        setShowModal(false)
        setContentModal({urlLarge: ''})
    };

    const loadMore = () => {
        setPage(page + 1)
    };

    const value = props.inputValue;
    
    return (
        <div>
            {value === "" && <h2>Please, enter your request</h2>}
            {showModal &&
                <Modal
                    content={contentModal}
                    onClick={closeModal} />
            }
            {images &&
                <div>
                    <ul className="gallery">
                        {images.map(({id, webformatURL, largeImageURL, tags}) =>
                            <ImageGalleryItem
                                key={id}
                                url={webformatURL}
                                largeImageURL={largeImageURL}
                                title={tags}
                                onClick={openModal}
                            />
                            )};
                    </ul>
                </div>
            }
            {loading && <Loader />}
            {images.length !== 0 && (
                <Button
                    onClick={loadMore}
                />
            )};
        </div>
    );
};

ImageGallery.propTypes = {
    inputValue: PropTypes.string,
};