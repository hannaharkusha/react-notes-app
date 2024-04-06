// App.js
import React from 'react';
import Note from './components/Note';
import Button from './components/Button';
import SearchBar from './components/SearchBar';
import Folder from './components/Folder';
import AddingForm from './components/AddingForm';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderPlus} from "@fortawesome/free-solid-svg-icons";
import AddFolderForm from "./components/AddFolderForm";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddingForm: false,
      showFolderForm: false,
      notes: JSON.parse(localStorage.getItem('notes')) || [], // Pobranie notatek z localStorage
      folders: JSON.parse(localStorage.getItem('folders')) || [], // Initial list of folders
    };
  }

  handleAddNoteClick = () => {
    this.setState({ showAddingForm: true });
  }

  handleCloseAddingForm = () => {
    this.setState({ showAddingForm: false });
  }

  // Function to add a new note
  handleAddNote = (newNote) => {
    this.setState(prevState => ({
      notes: [...prevState.notes, newNote]
    }), () => {
      // Zapisanie notatek do localStorage po dodaniu nowej notatki
      localStorage.setItem('notes', JSON.stringify(this.state.notes));
    });
  }

  // Function to delete a note
  handleDeleteNote = (index) => {
    this.setState(prevState => ({
      notes: prevState.notes.filter((note, i) => i !== index)
    }), () => {
      // Zapisanie notatek do localStorage po usunięciu notatki
      localStorage.setItem('notes', JSON.stringify(this.state.notes));
    });
  }

  handleAddFolderClick = () => {
    this.setState({ showFolderForm: true });
  }

  handleAddFolder = (newFolder) => {
    this.setState(prevState => ({
      folders: [...prevState.folders, newFolder]
    }), () => {
      // Zapisanie folderów do localStorage po dodaniu nowego folderu
      localStorage.setItem('folders', JSON.stringify(this.state.folders));
    });
  }
  handleCloseAddFolderForm = () => {
    this.setState({ showFolderForm: false });
  }

  render() {
    return (
        <div>
          <div className='top-div'>
            <div className='logo-text'>My Notes</div>
            <div className='top-div-right'>
              <SearchBar />
              <Button onClick={this.handleAddNoteClick} buttonText='Add note' />
            </div>
          </div>
          <div className='container'>
            <div className='container-left'>
              <div>
                {this.state.folders.map((folder, index) => (
                    <Folder key={index} name={folder.name}/>
                ))}
              </div>
              <div className='add-folder' onClick={this.handleAddFolderClick}><FontAwesomeIcon icon={faFolderPlus}/>
              </div>
            </div>
            <div className='container-right'>
              {this.state.notes.map((note, index) => (
                  <Note key={index} fold={note.folder} content={note.content} date={note.date} time={note.time} header="Note" onDelete={() => this.handleDeleteNote(index)} />
              ))}
            </div>
          </div>
          {this.state.showAddingForm && <AddingForm onClose={this.handleCloseAddingForm} onAddNote={this.handleAddNote} />}
          {this.state.showFolderForm && <AddFolderForm onClose={this.handleCloseAddFolderForm} onAddFolder={this.handleAddFolder} />}
        </div>
    );
  }
}

export default App;
