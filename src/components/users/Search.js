import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ showAlert, searchUser, clearUser, showClear }) => {
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    if (text === '') {
      showAlert('Please enter something', 'light');
    } else {
      searchUser(text);
      setText('');
    }
  };

  const onChange = (e) => setText(e.target.value);

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search users..'
          value={text}
          onChange={onChange}
        />

        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {showClear ? (
        <button className='btn btn-light btn-block' onClick={clearUser}>
          Clear
        </button>
      ) : null}
    </div>
  );
};

Search.propTypes = {
  searchUser: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default Search;
