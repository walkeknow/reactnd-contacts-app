import React, { Component } from 'react';
import ListContacts from "./listContacts";
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact'


class App extends Component {
  state = {
    contacts: [],
    screen: 'list'
  }
  componentDidMount() {
    ContactsAPI.getAll()
      .then((contacts) => {
        this.setState(() => ({
          contacts: contacts
        }))
      })
  }

  onNavigate = () => {
    this.setState(() => ({
      screen: 'create'
    }))
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
        {this.state.screen === 'list' &&
          <ListContacts
            contacts={this.state.contacts}
            onDeleteContact={this.removeContact}
            onNavigate={this.onNavigate}
          />}
        {this.state.screen === 'create' &&
          <CreateContact></CreateContact>}
      </div>
    );
  }
}

export default App;
