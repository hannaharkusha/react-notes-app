import React, { useState } from 'react';
import Button from "./Button";

function AddFolderForm({ onClose, onAddFolder }) {
    const [inputValue, setInputValue] = useState(''); // State to hold the input value
    const [colorValue, setColorValue] = useState(''); // State to hold the input value

    const handleInputChange = (event) => {
        setInputValue(event.target.value); // Update the input value
    };
    const handleColorChange = (event) => {
        setColorValue(event.target.value); // Update the input value
    };

    const handleAddClick = () => {
        if (!inputValue) return;
        const newFolder = {
            name: inputValue,
            color: colorValue
        };
        onAddFolder(newFolder); // Pass the new folder to the parent component
        onClose(); // Close the form
    };

    const handleCancelClick = () => {
        onClose(); // Close the form
    };

    return (
        <div className='adding-form-overlay'>
            <div className='adding-form'>
                <div className='folder-name-input'><input value={inputValue} onChange={handleInputChange} placeholder='Folder name'/></div>
                <div className='color-picker'>
                    <label htmlFor="colorpicker">Color</label>
                    <input type='color' id="colorpicker" value={colorValue} onChange={handleColorChange}/>
                </div>
                <div className='buttons-adding-form'>
                    <Button buttonText='Cancel' onClick={handleCancelClick}/>
                    <Button buttonText='Add' onClick={handleAddClick}/>
                </div>
            </div>
        </div>
    );
}

export default AddFolderForm;
