// AddingForm.js
import React, { useState } from 'react';
import Button from './Button';
import DropdownMenu from './DropdownMenu';
import Note from './Note';

function AddingForm({ onClose }) {

    const [inputValue, setInputValue] = useState('');
    const [selectedFolder, setSelectedFolder] = useState(null);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSelect = (option) => {
        setSelectedFolder(option);
    };

    const handleAddClick = () => {
        if (!inputValue || !selectedFolder) return;
        const newNote = {
            content: inputValue,
            folder: selectedFolder,
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString()
        };
        alert(JSON.stringify(newNote)); // Display the new note details
    };

    const handleCancelClick = () => {
        onClose();
    };

    return (
        <div className='adding-form-overlay'>
            <div className='adding-form'>
                <input value={inputValue} onChange={handleInputChange} />
                <DropdownMenu options={["Option 1", "Option 2", "Option 3"]} onSelect={handleSelect} />
                <div className='buttons-adding-form'>
                    <Button buttonText='Cancel' onClick={handleCancelClick} />
                    <Button buttonText='Add' onClick={handleAddClick} />
                </div>
            </div>
        </div>
    );
}

export default AddingForm;
