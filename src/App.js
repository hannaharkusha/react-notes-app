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
import NoteOpened from "./components/NoteOpened";
import { CSSTransition, TransitionGroup } from 'react-transition-group';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddingForm: false,
      showFolderForm: false,
      notes: JSON.parse(localStorage.getItem('notes')) || [], // Pobranie notatek z localStorage
      folders: JSON.parse(localStorage.getItem('folders')) || [], // Initial list of folders
      openedNote: null
    };
  }

  componentDidMount() {
    // Load notes and folders from localStorage when the component mounts
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const savedFolders = JSON.parse(localStorage.getItem('folders')) || [];
    this.setState({
      notes: savedNotes,
      folders: savedFolders
    });
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
      localStorage.setItem('notes', JSON.stringify(this.state.notes));
    });
  }

  // Function to delete a note
  handleDeleteNote = (index) => {
    this.setState(prevState => ({
      notes: prevState.notes.filter((note, i) => i !== index)
    }), () => {
     localStorage.setItem('notes', JSON.stringify(this.state.notes));
    });
  }

  handleDeleteFolder = (index) => {
    this.setState(prevState => ({
      folders: prevState.folders.filter((folder, i) => i !== index)
    }), () => {
      localStorage.setItem('folders', JSON.stringify(this.state.folders));
    });
  }

  handleEditFolder = (index) => {
    console.log('folder do edycji');
  }

  handleAddFolderClick = () => {
    this.setState({ showFolderForm: true });
  }

  handleAddFolder = (newFolder) => {
    this.setState(prevState => ({
      folders: [...prevState.folders, newFolder]
    }), () => {
      localStorage.setItem('folders', JSON.stringify(this.state.folders));
    });
  }
  handleCloseAddFolderForm = () => {
    this.setState({ showFolderForm: false });
  }

  handleOpenNote = (index) => {
    const note = this.state.notes[index];
    this.setState({ openedNote: note });
  }

  handleNoteClose = () => {
    this.setState({ openedNote: null });
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
                <TransitionGroup>
                {this.state.folders.map((folder, index) => (
                    <CSSTransition key={index} timeout={500} classNames="folder">
                      <Folder key={index} name={folder.name} color={folder.color}
                              onEdit={() => this.handleEditFolder(index)}
                              onDelete={() => this.handleDeleteFolder(index)}/>
                    </CSSTransition>
                ))}
                </TransitionGroup>
              </div>
              <div className='add-folder' onClick={this.handleAddFolderClick}><FontAwesomeIcon icon={faFolderPlus}/>
              </div>
            </div>
            <div className='container-right'>
              {/* Render the grid of Note components */}
              {!this.state.openedNote && (
                  <>
                    <div className='note-column'>
                      {this.state.notes.map((note, index) => {
                        if (index % 3 === 0) {
                          return (
                              <Note key={index} folder={note.folder} content={note.content} date={note.date}
                                    time={note.time}
                                    color={note.color} header={note.header} onClick={() => this.handleOpenNote(index)}
                                    onDelete={() => this.handleDeleteNote(index)}/>
                          );
                        }
                        return null;
                      })}
                    </div>
                    <div className='note-column'>
                      {this.state.notes.map((note, index) => {
                        if (index % 3 === 1) {
                          return (
                              <Note key={index} folder={note.folder} content={note.content} date={note.date}
                                    time={note.time}
                                    color={note.color} header={note.header}
                                    onDelete={() => this.handleDeleteNote(index)}
                                    onClick={() => this.handleOpenNote(index)}/>
                          );
                        }
                        return null;
                      })}
                    </div>
                    <div className='note-column'>
                      {this.state.notes.map((note, index) => {
                        if (index % 3 === 2) {
                          return (
                              <Note key={index} folder={note.folder} content={note.content} date={note.date}
                                    time={note.time}
                                    color={note.color} header={note.header} onClick={() => this.handleOpenNote(index)}
                                    onDelete={() => this.handleDeleteNote(index)}/>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </>
              )}

              {/* Render the NoteOpened component if openedNote is not null */}
              {this.state.openedNote && (
                  <NoteOpened
                      content={this.state.openedNote.content}
                      header={this.state.openedNote.header}
                      date={this.state.openedNote.date}
                      time={this.state.openedNote.time}
                      folder={this.state.openedNote.folder}
                      color={this.state.openedNote.color}
                      onClose={this.handleNoteClose}
                  />
              )}
            </div>
          </div>
          {this.state.showAddingForm &&
              <AddingForm onClose={this.handleCloseAddingForm} onAddNote={this.handleAddNote}/>}
          {this.state.showFolderForm &&
              <AddFolderForm onClose={this.handleCloseAddFolderForm} onAddFolder={this.handleAddFolder}/>}
        </div>
    );
  }
}

export default App;
