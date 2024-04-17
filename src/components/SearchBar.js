import React from 'react'

function SearchBar(props){
    return (
        <div className='searchBar'>
            <input className='searchBar-input' placeholder='Search' onInput={props.onInput}/>
            <div onClick={props.onClick}></div>
        </div>
    );
}

export default SearchBar;