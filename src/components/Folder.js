import React from 'react'

function Folder(props){
    return (
        <div onClick={props.onClick} className='folder'>
            {props.name}
        </div>
    );
}

export default Folder;