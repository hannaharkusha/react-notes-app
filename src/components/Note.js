import React from 'react'

function Note(props){
    return (
        <div className='note'>
            <div className='note-top'>
                <div className='note-header'>{props.header}</div>
                <div className='note-folder'>{props.fold}</div>
            </div>
            <div className='note-content' onClick={props.onClick}>{props.content}</div>
            <div className='note-bottom'>
                <div>{props.time}</div>
                <div>{props.date}</div>
            </div>
        </div>
    );
}

export default Note;