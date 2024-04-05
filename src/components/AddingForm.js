import React from 'react';
import Button from './Button';
import DropdownMenu from './DropdownMenu';

function AddingForm({ onClose }) {
    function handleAddClick() {
        alert('add in adding form clicked');
    }

    function handleCancelClick() {
        onClose();
    }

    return (
        <div className='adding-form-overlay'>
            <div className='adding-form'>
                <input />
                <DropdownMenu />
                <div className='buttons-adding-form'>
                    <Button buttonText='Cancel' onClick={handleCancelClick} />
                    <Button buttonText='Add' onClick={handleAddClick} />
                </div>
            </div>
        </div>
    );
}

export default AddingForm;