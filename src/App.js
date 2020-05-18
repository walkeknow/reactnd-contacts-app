import React, { Component } from 'react';
import ListContacts from "./listContacts";
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact'
import { Route } from 'react-router-dom'


class App extends Component {
  state = {
    contacts: [],
  }
  componentDidMount() {
    ContactsAPI.getAll()
      .then((contacts) => {
        this.setState(() => ({
          contacts: contacts
        }))
      })
  }

  removeContact = (contactToRemove) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter(contact => contact.id !== contactToRemove.id)
    }))
    ContactsAPI.remove(contactToRemove)
  }
  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListContacts
            contacts={this.state.contacts}
            onDeleteContact={this.removeContact}
            onNavigate={this.onNavigate}
          />
        )} />

        <Route path='/create' component={CreateContact}/>
      </div>
    );
  }
}

export default App;
