var express = require('express');
var router = express.Router();

// ================================================
// "/contacts" ROUTES
// ================================================

let contactsDB = [];

router.route('/')

    // GET|Index - "/contacts" - List all contacts
    .get((req, res) => {
        res.send('List all contacts')
    })

    // POST|Create - "/contacts" - Create a new contact
    .post((req, res) => {
        res.send('Create a new contact')
    })

// ================================================
// "/contacts/:contactName" ROUTES
// ================================================

router.route('/:contactName')

    // GET|Show - "/contacts/:contactName" - Show specific contact
    .get((req, res) => {
        res.send('Show specific contact')
    })

    // PUT|Update - "/contacts/:contactName" - Update specific contact
    .put((req, res) => {
        res.send('Update specific contact')
    })

    // DELETE|Destroy - "/contacts/:contactName" - Delete specific contact
    .delete((req, res) => {
        res.send('Delete specific contact')
    })


module.exports = router; 