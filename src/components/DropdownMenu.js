import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function DropdownMenu({ options, onSelect }) {
    const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility
    const [selectedOption, setSelectedOption] = useState(null); // State to store the selected option

    const handleToggleClick = () => {
        setDropdownOpen(!dropdownOpen); // Toggle the dropdownOpen state
    };

    const handleOptionSelect = (option) => {
        onSelect(option);
        setSelectedOption(option); // Update the selected option
        setDropdownOpen(false); // Close the dropdown after selecting an option
    };

    if(dropdownOpen){
        return (
            <Dropdown className='dropdown' show={dropdownOpen} onToggle={handleToggleClick}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <span>{selectedOption || "Choose folder"}</span>
                    <span><FontAwesomeIcon icon={faAngleDown} /></span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {options.map((option, index) => (
                        <Dropdown.Item key={index} onClick={() => handleOptionSelect(option)}>
                            {option}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
    else {
        return (
            <Dropdown className='dropdown' show={dropdownOpen} onToggle={handleToggleClick}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <span>{selectedOption || "Choose folder"}</span>
                    <span><FontAwesomeIcon icon={faAngleDown}/></span>
                </Dropdown.Toggle>
            </Dropdown>
        );
    }
}

export default DropdownMenu;
