const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");
require("colors");

const contactsPath = path.join("./db", "conctacts.json");
const contactsData = require("./db/contacts.json");

function conctactsParsed(data) {
  return JSON.parse(data.toString());
}
function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => {
      return conctactsParsed(data);
    })
    .then((list) => {
      return [...list].sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    })
    .then((results) => console.log(results))
    .catch((err) => console.log("listContacts error".red, err.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = conctactsParsed(data);
      return contacts;
    })
    .then((contacts) => {
      const filteredContacts = contacts.filter(
        (contact) => contact.id == contactId
      );
      if (filteredContacts.length > 0) {
        console.log(filteredContacts);
        return;
      }
    })
    .catch((err) => console.log("getContactById error".red, err.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = conctactsParsed(data);
      return contacts;
    })
    .then((contacts) => {
      const contactIndex = contacts.findIndex(
        (contact) => contact.id === contactId
      );
      if (contactIndex !== -1) {
        contacts.splice(contactIndex, 1);

        fs.writeFile(contactId, JSON.stringify(contacts), (err) => {
          if (err) {
            console.log("removeContact error".red, err.message);
            return;
          }
        });
        console.log(`Removed contact with id: ${contactId}`.green);
      } else {
        console.log(`No contact with ${contactId} id was found.`.yellow);
      }
    })
    .catch((error) => console.log(error.message));
}

function addContact(name, email, phone) {
  const ID = nanoid();
  const contact = {
    id: ID,
    name,
    email,
    phone,
  };
  if (name === undefined || email === undefined || phone === undefined) {
    console.log("Please fill in all fields!".blue);
    return;
  }

  contactsData.push(contact);

  const contactsUpdated = JSON.stringify(contactsData);

  fs.writeFile(contactsPath, contactsUpdated, (err) => {
    if (err) {
      console.log("addContact error".red, err.message);
    }
  });
}

module.exports = {
  listContacts,
  removeContact,
  addContact,
  getContactById,
};
