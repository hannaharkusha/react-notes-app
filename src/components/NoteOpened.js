import React, {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrash, faXmark} from "@fortawesome/free-solid-svg-icons";

function NoteOpened(props) {

    const [content, setContent] = useState(props.content); // State to hold the editable content

    const handleContentChange = (event) => {
        setContent(event.target.textContent); // Update the state with the new content

        // Wywołaj funkcję zaktualizowania zawartości notatki w komponencie App
        props.onUpdateContent(event.target.textContent);
    };

    return (
        <div className='note-opened'>
            <div className='note-opened-top'>
                <div>
                    <div className='note-opened-header'>{props.header}</div>
                    <div className='note-opened-folder' style={{backgroundColor: props.color}}>{props.folder}</div>
                </div>
                <div><FontAwesomeIcon icon={faXmark} onClick={props.onClose}/></div>
            </div>
            <div className='note-opened-content' contentEditable={true} onBlur={handleContentChange}>{content}</div>
            <div className='note-opened-bottom'>
                <div>
                    <div>{props.time}</div>
                    <div>{props.date}</div>
                </div>
                <div><FontAwesomeIcon className='delete-icon' icon={faTrash} onClick={props.onDelete} /></div>
            </div>
        </div>
    );
}
export default NoteOpened;