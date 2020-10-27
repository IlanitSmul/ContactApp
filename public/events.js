$(document).ready(function () {
    showAllContacts(); // load all contacts
    clearErrorMessage();
});


// ================================================
// new contact form
// ================================================

// click event on "add-contact-form-submit": create a new contact
$('#add-contact-form-submit').click(function (event) {
    event.preventDefault();
    clearErrorMessage();

    let data = $('#add-contact-form').serialize();

    $.post('/contacts', data)
        .then(function (newContact) {
            $('#add-contact-form').trigger("reset");
            $("#form-error-message").text('');
            addContact(newContact);
        })
        .catch(function (err) {
            $("#form-error-message").text(err.responseJSON);
        })
});


// ================================================
// search form
// ================================================

// click event on "search-btn": show info about specific contact
$('#search-btn').click(function (event) {
    event.preventDefault();
    clearErrorMessage();

    var name = $('#searchInput').val();

    if (name.trim().length === 0) {
        $("#search-error-message").text(`Error: 'name' parameter is required`);
        return;
    }

    $.get(`/contacts/${name}`)
        .then(function (foundContact) {
            $('#search-form').trigger("reset");
            showContact(foundContact);
        })
        .catch(function (err) {
            hideAllContacts();
            $("#search-error-message").text(err.responseJSON);
        })
});

// click event on "show-all-btn": show all contacts
$('#show-all-btn').click(function (event) {
    event.preventDefault();
    clearErrorMessage();
    $('#search-form').trigger("reset");

    showAllContacts();
});


// ================================================
// contacts list
// ================================================

// click event on "delete-contact-btn": delete contact
$('#list-section').on('click', '.delete-contact-btn', function (e) {
    e.stopPropagation();
    clearErrorMessage();

    let contact = $(this).parent().parent(); // "card" element (with the "data" properties)

    $.ajax({
        method: 'DELETE',
        url: '/contacts/' + contact.data('name')
    }).then(function (data) {
        contact.remove();
    }).catch(function (err) {
        // console.log(err);
    })
})


// ================================================
// DOM helpers
// ================================================

// clear all error messages from the DOM
function clearErrorMessage() {
    $("#form-error-message").text('');
    $("#search-error-message").text('');
}

// hide all contacts from DOM
function hideAllContacts() {
    $('#list-section').empty();
}

// show all contacts in the DOM
function showAllContacts() {
    hideAllContacts();

    $.getJSON("/contacts")
        .then(function (contacts) {
            contacts.forEach(function (contact) {
                addContact(contact);
            });
        })
}

// show only specific contact in the DOM
function showContact(contact) {
    hideAllContacts();
    addContact(contact);
}

// add new contact object to the DOM
function addContact(contact) {
    var newContact = $(`
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">${contact.name}</h5>
            <p class="card-text">${contact.phone}</p>
            <p class="card-text">${contact.email}</p>
            <p class="card-text">${contact.address}</p>
            <button class="delete-contact-btn btn btn-primary">Delete</button>
        </div>
    </div>
    `);
    newContact.data('name', contact.name);
    $('#list-section').append(newContact);
}