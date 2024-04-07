import React from 'react'

function Folder(props){
    return (
        <div onClick={props.onClick} className='folder'>
            <div style={{backgroundColor: props.color}} className='folder-color'></div>
            <div>{props.name}</div>
        </div>
    );
}

export default Folder;