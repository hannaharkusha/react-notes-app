import React from 'react'

function Note(props){
    return (
        <div className='note'>
            <div>{props.header}{props.fold}</div>
            <div onClick={props.onClick}>{props.content}</div>
            <div>{props.time}{props.date}</div>
        </div>
    );
}

export default Note;