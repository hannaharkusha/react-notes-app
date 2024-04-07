import React, {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrash, faXmark} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

function NoteOpened(props) {
    return (
        <div className='note-opened'>
            <div className='note-opened-top'>
                <div>
                    <div className='note-opened-header'>{props.header}</div>
                    <div className='note-opened-folder' style={{backgroundColor: props.color}}>{props.folder}</div>
                </div>
                <div><FontAwesomeIcon icon={faXmark} onClick={props.onClose}/></div>
            </div>
            <div className='note-opened-content'>{props.content}</div>
            <div className='note-opened-bottom'>
                <div>
                    <div>{props.time}</div>
                    <div>{props.date}</div>
                </div>
                <div><Button buttonText='Delete note' onClick={props.onDelete} /></div>
            </div>
        </div>
    );
}
export default NoteOpened;