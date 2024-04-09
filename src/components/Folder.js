import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

function Folder(props){

    const folderClass = props.isSelected ? 'folder selected' : 'folder'; // Apply selected class if isSelected is true

    return (
        <div  className={folderClass}>
            <div className='folder-left' onClick={props.onClick}>
                <div style={{backgroundColor: props.color}} className='folder-color'></div>
                <div>{props.name}</div>
            </div>
            <div className='folder-right'>
                {/*<div><FontAwesomeIcon className='delete-icon' icon={faPenToSquare} onClick={props.onEdit}/></div>*/}
                <div><FontAwesomeIcon className='delete-icon' icon={faTrash} onClick={props.onDelete}/></div>
            </div>
        </div>
    );
}

export default Folder;