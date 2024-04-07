import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";

function Folder(props){
    return (
        <div onClick={props.onClick} className='folder'>
            <div className='folder-left'>
                <div style={{backgroundColor: props.color}} className='folder-color'></div>
                <div>{props.name}</div>
            </div>
            <div className='folder-right'>
                <div><FontAwesomeIcon className='delete-icon' icon={faPenToSquare} onClick={props.onEdit}/></div>
                <div><FontAwesomeIcon className='delete-icon' icon={faTrash} onClick={props.onDelete}/></div>
            </div>
        </div>
    );
}

export default Folder;