import React, { useState, useEffect } from 'react';
import Button from './Button';
import DropdownMenu from './DropdownMenu';

function AddingForm({ onClose, onAddNote }) {
    const [inputValue, setInputValue] = useState('');
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [folders, setFolders] = useState([]);

    // Fetch folders from localStorage on component mount
    useEffect(() => {
        const storedFolders = JSON.parse(localStorage.getItem('folders')) || [];
        setFolders(storedFolders);
    }, []);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSelect = (option) => {
        setSelectedFolder(option);
    };

    const handleAddClick = () => {
        if (!inputValue || !selectedFolder) return;

        const selectedFolderObject = folders.find(folder => folder.name === selectedFolder);

        if (!selectedFolderObject) return;

        const newNote = {
            content: inputValue,
            folder: selectedFolder,
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
            color: selectedFolderObject.color
        };

        onAddNote(newNote);
        onClose();
    };

    const handleCancelClick = () => {
        onClose();
    };

    return (
        <div className='adding-form-overlay'>
            <div className='adding-form'>
                <textarea value={inputValue} onChange={handleInputChange} placeholder='Type here..'></textarea>
                <DropdownMenu options={folders.map(folder => folder.name)} onSelect={handleSelect} />
                <div className='buttons-adding-form'>
                    <Button buttonText='Cancel' onClick={handleCancelClick} />
                    <Button buttonText='Add' onClick={handleAddClick} />
                </div>
            </div>
        </div>
    );
}

export default AddingForm;
