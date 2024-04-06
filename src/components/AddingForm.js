// AddingForm.js
import React, { useState } from 'react';
import Button from './Button';
import DropdownMenu from './DropdownMenu';
import Note from './Note';

function AddingForm({ onClose, onAddNote }) {
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
        onAddNote(newNote); // Pass the new note to the parent component
        onClose();
    };

    const handleCancelClick = () => {
        onClose();
    };

    return (
        <div className='adding-form-overlay'>
            <div className='adding-form'>
                <textarea value={inputValue} onChange={handleInputChange} placeholder='Type here..'></textarea>
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
