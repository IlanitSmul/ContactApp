// ================================================
// event listeners
// ================================================

$(document).ready(function () {

    // load all contacts:
    $.getJSON("/contacts")
        .then(addContacts)

});


// click event on form submit button
$('#add-contact-form-submit').click(function (event) {
    event.preventDefault();
    let data = $('#add-contact-form').serialize();
    $.post('/contacts', data)
        .then(function (newContact) {
            $('#add-contact-form').trigger("reset");
            $("#error-message").text('');
            addContact(newContact);
        })
        .catch(function (err) {
            $("#error-message").text(err.responseJSON);
        })
});

// ================================================
// helpers
// ================================================

// add list of Contact objects to DOM
function addContacts(contacts) {
    contacts.forEach(function (contact) {
        addContact(contact);
    });
}

// add new Contact object to DOM
function addContact(contact) {
    var newContact = $(`
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">${contact.name}</h5>
            <p class="card-text">${contact.phone}</p>
            <p class="card-text">${contact.email}</p>
            <p class="card-text">${contact.address}</p>
        </div>
    </div>
    `);
    newContact.data('name', contact.name);
    $('#list-section').append(newContact);
} 