import React, { Component } from 'react';
import ListContacts from "./listContacts";
import * as ContactsAPI from './utils/ContactsAPI'


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
        <ListContacts
          contacts={this.state.contacts}
          onDeleteContact={this.removeContact} />
      </div>
    );
  }
}

export default App;
