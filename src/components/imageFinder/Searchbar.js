import {useState} from "react"
import PropTypes from 'prop-types';

export const Searchbar = (props) => {

    const [inputValue, setInputValue] = useState('')
    
    const handleInput = e => {
        setInputValue(e.target.value.toLowerCase());
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (inputValue.trim() === '') {
            alert('Please, enter a keyword to search!');
            return;
        }
        props.onSubmit(inputValue);
        setInputValue('');
    };

    return (
        <div className="form">
            <form
                className="search-form"
                id="search-form"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    name="searchQuery"
                    autoComplete="off"
                    value={inputValue}
                    placeholder="Search images..."
                    onChange={handleInput}
                />
                <button
                    type="submit"
                    className="search"
                >
                    S
                </button>
                
            </form>
        </div>
    );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};