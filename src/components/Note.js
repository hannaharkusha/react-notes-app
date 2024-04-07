// Note.js
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Note(props) {

    console.log("Color:", props.color); // Add this line to check if color prop is received

    return (
        <div className='note' style={{backgroundColor: props.color}}>
            <div className='note-top'>
                <div className='note-header'>{props.header}</div>
                <div className='note-folder' style={{color: props.color}}>{props.fold}</div>
            </div>
            <div className='note-content' onClick={props.onClick}>{props.content}</div>
            <div className='note-bottom'>
                <div>{props.time}</div>
                <div>{props.date}<FontAwesomeIcon className='delete-icon' icon={faTrash} onClick={props.onDelete} /></div> {/* Dodanie obsługi kliknięcia na ikonę kosza */}
            </div>
        </div>
    );
}

export default Note;
