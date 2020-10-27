$(document).ready(function () {
    showAllContacts();
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
            clearErrorMessage();
            showAllContacts();
        })
        .catch(function (err) {
            showError("#form-error-message", err.responseJSON);
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
        showError("#search-error-message", `Error: 'name' parameter is required`);
        return;
    }

    $.get(`/contacts/${name}`)
        .then(function (foundContact) {
            $('#search-form').trigger("reset");
            showContact(foundContact);
        })
        .catch(function (err) {
            hideAllContacts();
            showError("#search-error-message", err.responseJSON);
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
$('#list').on('click', '#delete-contact-btn', function (e) {
    e.stopPropagation();
    clearErrorMessage();

    let contact = $(this).parent().parent().parent(); // "card" element (with the "data" properties)

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

// show error selector with text equal to errMessage
function showError(selector, errMessage) {
    $(selector).text(errMessage);
    $(selector).show();
}


// clear all error messages from the DOM
function clearErrorMessage() {
    ["#form-error-message", "#search-error-message"].forEach(selector => {
        $(selector).text('');
        $(selector).hide();
    });
}

// hide all contacts from DOM
function hideAllContacts() {
    $('#list').empty();
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
    console.log(contact);
    ['phone', 'email', 'address'].forEach(key => {
        if (contact[key].trim().length === 0) {
            contact[key] = '[not specified]';
        }
    });

    console.log(contact);

    var newContact = $(`
    <div class="col py-2 px-2 m-0">
        <div class="card h-100 mx-0">
            <div class="card-body">
                <h5 class="card-title pb-1">${contact.name}</h5>
                <p class="card-text"><i class="fas fa-phone-alt pr-1"></i> ${contact.phone}</p>
                <p class="card-text"><i class="fas fa-at pr-1"></i> ${contact.email}</p>
                <p class="card-text"><i class="fas fa-map-marker-alt pr-1"></i> ${contact.address}</p>
                <button class="btn btn-primary" id="delete-contact-btn">Delete</button>
            </div>
        </div>
    </div>
    `);
    newContact.data('name', contact.name);
    $('#list').append(newContact);
}
