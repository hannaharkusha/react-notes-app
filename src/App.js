import React from 'react';
import Note from './components/Note';
import Button from './components/Button';
import SearchBar from './components/SearchBar';
import Folder from './components/Folder';
import AddingForm from './components/AddingForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import AddFolderForm from "./components/AddFolderForm";
import NoteOpened from "./components/NoteOpened";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddingForm: false,
      showFolderForm: false,
      notes: JSON.parse(localStorage.getItem('notes')) || [],
      folders: JSON.parse(localStorage.getItem('folders')) || [],
      openedNote: null,
      selectedFolder: null, // New state variable to store the selected folder
      searchedNotes: JSON.parse(localStorage.getItem('notes')) || [],
    };
  }

  componentDidMount() {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const savedFolders = JSON.parse(localStorage.getItem('folders')) || [];
    this.setState({
      notes: savedNotes,
      folders: savedFolders,
      searchedNotes: savedNotes
    });
  }

  handleAddNoteClick = () => {
    this.setState({ showAddingForm: true });
  }

  handleCloseAddingForm = () => {
    this.setState({ showAddingForm: false });
  }

  handleAddNote = (newNote) => {
    this.setState(prevState => ({
      notes: [...prevState.notes, newNote],
      searchedNotes: [...prevState.searchedNotes, newNote] // Add new note to searchedNotes
    }), () => {
      localStorage.setItem('notes', JSON.stringify(this.state.notes));
    });
  }

  handleDeleteNote = (index) => {
    this.setState(prevState => ({
      notes: prevState.notes.filter((note, i) => i !== index),
      searchedNotes: prevState.searchedNotes.filter((note, i) => i !== index) // Remove deleted note from searchedNotes
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

  handleUpdateNoteContent = (newContent) => {
    const updatedNote = { ...this.state.openedNote, content: newContent };
    this.setState({ openedNote: updatedNote });

    const updatedNotes = this.state.notes.map(note => {
      if (note.time === updatedNote.time) {
        return updatedNote;
      }
      return note;
    });
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    this.componentDidMount();
  }

  handleDeleteOpenedNote = (time) => {
    const index = this.state.notes.findIndex(note => note.time === time);

    if (index !== -1) {
      const updatedNotes = [...this.state.notes];
      updatedNotes.splice(index, 1);

      this.setState({
        searchedNotes: updatedNotes,
        notes: updatedNotes,
        openedNote: null
      }, () => {
        localStorage.setItem('notes', JSON.stringify(this.state.notes));
      });
    }
  }

  handleFolderClick = (folderName) => {
    this.setState({ selectedFolder: folderName });
  }

  handleSearchBarInputChange = (event) => {
    const searchInput = event.target.value.toLowerCase();
    const searchedNotes = this.state.notes.filter(note =>
        note.content.toLowerCase().includes(searchInput) // Check if note content includes the search input
    );
    this.setState({searchedNotes: searchedNotes});
}

  handleAllNoteClick = () => {
    this.setState({
      selectedFolder : null
    });
  }

  render() {
    const filteredNotes = this.state.selectedFolder ?
        this.state.searchedNotes.filter(note => note.folder === this.state.selectedFolder) :
        this.state.searchedNotes;

    return (
        <div>
          <div className='top-div'>
            <div className='logo-text'>My Notes</div>
            <div className='top-div-right'>
              <SearchBar  onInput={this.handleSearchBarInputChange}/>
              <Button onClick={this.handleAddNoteClick} buttonText='Add note' />
            </div>
          </div>
          <div className='container'>
            <div className='container-left'>
              <div>
                <div className='all-notes folder' onClick={this.handleAllNoteClick}>All </div>
                <TransitionGroup>
                  {this.state.folders.map((folder, index) => (
                      <CSSTransition key={index} timeout={500} classNames="folder">
                        <Folder
                            key={index}
                            name={folder.name}
                            color={folder.color}
                            // onEdit={() => this.handleEditFolder(index)}
                            onDelete={() => this.handleDeleteFolder(index)}
                            onClick={() => this.handleFolderClick(folder.name)} // Add click handler to filter notes by folder
                            isSelected={this.state.selectedFolder === folder.name} // Pass isSelected prop true false
                        />
                      </CSSTransition>
                  ))}
                </TransitionGroup>
              </div>
              <div className='add-folder' onClick={this.handleAddFolderClick}>
                <FontAwesomeIcon icon={faFolderPlus} />
              </div>
            </div>
            <div className='container-right'>
              {!this.state.openedNote && (
                  <>
                    <div className='note-column'>
                      {filteredNotes.map((note, index) => {
                        if (index % 3 === 0) {
                          return (
                              <Note
                                  key={index}
                                  folder={note.folder}
                                  content={note.content}
                                  date={note.date}
                                  time={note.time}
                                  color={note.color}
                                  header={note.header}
                                  onClick={() => this.handleOpenNote(index)}
                                  onDelete={() => this.handleDeleteNote(index)}
                              />
                          );
                        }
                        return null;
                      })}
                    </div>
                    <div className='note-column'>
                      {filteredNotes.map((note, index) => {
                        if (index % 3 === 1) {
                          return (
                              <Note
                                  key={index}
                                  folder={note.folder}
                                  content={note.content}
                                  date={note.date}
                                  time={note.time}
                                  color={note.color}
                                  header={note.header}
                                  onDelete={() => this.handleDeleteNote(index)}
                                  onClick={() => this.handleOpenNote(index)}
                              />
                          );
                        }
                        return null;
                      })}
                    </div>
                    <div className='note-column'>
                      {filteredNotes.map((note, index) => {
                        if (index % 3 === 2) {
                          return (
                              <Note
                                  key={index}
                                  folder={note.folder}
                                  content={note.content}
                                  date={note.date}
                                  time={note.time}
                                  color={note.color}
                                  header={note.header}
                                  onClick={() => this.handleOpenNote(index)}
                                  onDelete={() => this.handleDeleteNote(index)}
                              />
                          );
                        }
                        return null;
                      })}
                    </div>
                  </>
              )}

              {this.state.openedNote && (
                  <NoteOpened
                      content={this.state.openedNote.content}
                      header={this.state.openedNote.header}
                      date={this.state.openedNote.date}
                      time={this.state.openedNote.time}
                      folder={this.state.openedNote.folder}
                      color={this.state.openedNote.color}
                      onClose={this.handleNoteClose}
                      onUpdateContent={this.handleUpdateNoteContent}
                      onDelete={() => {
                        this.handleDeleteOpenedNote(this.state.openedNote.time);
                        this.setState({ openedNote: null });
                      }}
                  />
              )}
            </div>
          </div>
          {this.state.showAddingForm &&
              <AddingForm onClose={this.handleCloseAddingForm} onAddNote={this.handleAddNote} />}
          {this.state.showFolderForm &&
              <AddFolderForm onClose={this.handleCloseAddFolderForm} onAddFolder={this.handleAddFolder} />}
        </div>
    );
  }
}

export default App;
