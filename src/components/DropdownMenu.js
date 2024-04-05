import React from 'react'

function DropdownMenu(){
    function toggleMenu(){
        let menu = document.getElementById("menu");
        if (menu.style.display === "none" || menu.style.display === "") {
            menu.style.display = "flex";
        } else {
            menu.style.display = "none";
        }
    }
    return (
        <div>
            <div className="menu-container" onClick={toggleMenu}>
                <span>Choose Folder</span>
                <span>&#9660;</span>
            </div>
            <div className="menu" id="menu">
                <div className="menu-item">Option 1</div>
                <div className="menu-item">Option 2</div>
                <div className="menu-item">Add new folder..</div>
            </div>
        </div>
    );
}

export default DropdownMenu;