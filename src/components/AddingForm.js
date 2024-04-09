import React, { useState, useEffect } from 'react';
import Button from './Button';
import DropdownMenu from './DropdownMenu';

function AddingForm({ onClose, onAddNote }) {
    const [inputValue, setInputValue] = useState('');
    const [headerValue, setHeaderValue] = useState('');
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

    const handleHeaderChange = (event) => {
        setHeaderValue(event.target.value);
    };

    const handleSelect = (option) => {
        setSelectedFolder(option);
    };

    const handleAddClick = () => {
        if (!inputValue || !selectedFolder) return;

        const selectedFolderObject = folders.find(folder => folder.name === selectedFolder);

        if (!selectedFolderObject) return;

        const newNote = {
            header: headerValue !== undefined ? headerValue : '',
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
            <div className='adding-form position-note-form'>
                <div className='note-form-header'>Adding new note</div>
                <textarea className="header-textarea" value={headerValue} onChange={handleHeaderChange} placeholder='Header'></textarea>
                <textarea className="main-textarea" value={inputValue} onChange={handleInputChange} placeholder='Note text..'></textarea>
                <DropdownMenu options={folders.map(folder => folder.name)} onSelect={handleSelect}/>
                <div className='buttons-adding-form'>
                    <Button buttonText='Cancel' onClick={handleCancelClick}/>
                    <Button buttonText='Add' onClick={handleAddClick}/>
                </div>
            </div>
        </div>
    );
}

export default AddingForm;
