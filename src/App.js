import React from 'react';
import Note from './components/Note';
import Button from './components/Button';
import SearchBar from './components/SearchBar';
import Folder from './components/Folder';
import AddingForm from './components/AddingForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddingForm: false
    };
  }

  handleAddNoteClick = () => {
    this.setState({ showAddingForm: true });
  }

  handleCloseAddingForm = () => {
    this.setState({ showAddingForm: false });
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
              <Folder name='Folder 1'/>
              <Folder name='Folder 2'/>
            </div>
            <div className='container-right'>
              <Note content="My first note" />
              <Note content="My second note" />
            </div>
          </div>
          {this.state.showAddingForm && <AddingForm onClose={this.handleCloseAddingForm} />}
        </div>
    );
  }
}

export default App;
