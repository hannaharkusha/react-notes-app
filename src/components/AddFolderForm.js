import React, { useState } from 'react';
import Button from "./Button";

function AddFolderForm({ onClose, onAddFolder }) {
    const [inputValue, setInputValue] = useState(''); // State to hold the input value

    const handleInputChange = (event) => {
        setInputValue(event.target.value); // Update the input value
    };

    const handleAddClick = () => {
        if (!inputValue) return;
        const newFolder = {
            name: inputValue
        };
        onAddFolder(newFolder); // Pass the new folder to the parent component
        onClose(); // Close the form
    };

    const handleCancelClick = () => {
        onClose(); // Close the form
    };

    return (
        <div className='adding-form-overlay'>
            <div className='adding-form-small'>
                <input value={inputValue} onChange={handleInputChange} placeholder='Folder name' />
                <div className='buttons-adding-form'>
                    <Button buttonText='Cancel' onClick={handleCancelClick} />
                    <Button buttonText='Add' onClick={handleAddClick} />
                </div>
            </div>
        </div>
    );
}

export default AddFolderForm;
