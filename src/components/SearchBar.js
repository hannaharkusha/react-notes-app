import React from 'react'

function SearchBar(props){
    return (
        <div>
            <input className='searchBar'/>
            <div onClick={props.onClick}></div>
        </div>
    );
}

export default SearchBar;