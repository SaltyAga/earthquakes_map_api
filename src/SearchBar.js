import React from 'react';

const SearchBar = ({onSubmit, onChange, valueYear, valueMonth}) => {

    return (
        <form onSubmit={onSubmit}>
          <input type="text"
            onChange={onChange}
            placeholder="Year"
            value={valueYear}
            id="year"></input>
            <input type="text"
            onChange={onChange}
            placeholder="Month"
            value={valueMonth}
            id="month"></input>
            <button>Search</button>
        </form>
        
    )
};


export default SearchBar;