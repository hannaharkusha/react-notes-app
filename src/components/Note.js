import React from 'react'

function Note(props){
    return (
        <div className='note' onClick = {props.onClick}>{props.content}
        </div>
    );
}

export default Note;