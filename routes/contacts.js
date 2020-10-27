var express = require('express');
var router = express.Router();


// ================================================
// database 
// ================================================

let contactsDB = [
    {
        name: 'example contact name',
        phoneNumber: 'example contact phone number',
        address: 'example contact address',
    },
];

// ================================================
// "/contacts" ROUTES
// ================================================

router.route('/')

    // GET|Index - "/contacts" - List all contacts
    .get((req, res) => {
        return res.json(contactsDB);
    })

    // POST|Create - "/contacts" - Create a new contact
    .post((req, res) => {
        let newContact = req.body;

        let oldContactIndex = contactsDB.findIndex(c => c.name == newContact.name);

        // if a contact with the same name exist - override it, else - create new contact
        (oldContactIndex == -1)
            ? contactsDB.push(newContact) // create new contact
            : contactsDB[oldContactIndex] = newContact; // override the old contact

        return res.json(newContact);
    })

// ================================================
// "/contacts/:contactName" ROUTES
// ================================================

router.route('/:contactName')

    // GET|Show - "/contacts/:contactName" - Show specific contact
    .get((req, res) => {
        let contactName = req.params.contactName;

        let foundContact = contactsDB.find(c => c.name == contactName);

        // if the contact isn't exist - return error message, else - return the found contact
        return (foundContact == undefined)
            ? res.json(`Error: contact with the name ${contactName} not found`)
            : res.json(foundContact);
    })

    // PUT|Update - "/contacts/:contactName" - Update specific contact
    .put((req, res) => {
        let contactName = req.params.contactName;
        let updateContact = req.body;

        let oldContactIndex = contactsDB.findIndex(c => c.name == contactName);

        // if the contact isn't exist - return error message, else - update the found contact
        if (oldContactIndex == -1) {
            return res.json(`Error: contact with the name ${contactName} not found`)
        } else {
            contactsDB[oldContactIndex] = { ...contactsDB[oldContactIndex], ...updateContact };
            return res.json(contactsDB[oldContactIndex])
        }
    })

    // DELETE|Destroy - "/contacts/:contactName" - Delete specific contact
    .delete((req, res) => {
        let contactName = req.params.contactName;

        let oldContactIndex = contactsDB.findIndex(c => c.name == contactName);

        // if the contact isn't exist - return error message, else - delete the found contact
        if (oldContactIndex == -1) {
            return res.json(`Error: contact with the name ${contactName} not found`)
        } else {
            contactsDB.splice(oldContactIndex, 1);
            return res.json(`delete contact with the name ${contactName}`)
        }
    })


module.exports = router; 