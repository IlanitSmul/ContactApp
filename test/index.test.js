const app = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);

// ================================================
// "/whos-there" ROUTES
// ================================================

describe('/whos-there', () => {

    describe('GET /whos-there', () => {
        it('it should GET my name', (done) => {
            chai.request(app)
                .get('/whos-there')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.equals("Hi Trax! This is Ilanit Smul");
                    done();
                });
        });
    });

});


// ================================================
// "/contacts" ROUTES
// ================================================

var notExistName = 'notExistName';
names = ['name-0', 'name-1', 'name-2'];
existContactWithSameName = {
    'name': 'name-0',
    'email': 'contact_0_but_with_different_mail@gmail.com',
}
existContactBody = {
    'phone': '000-00000000',
    'email': 'contact_0@gmail.com',
}
newContact = {
    'name': 'name-3',
    'phone': '333-33333333',
}
newContactBody = {
    'address': "TLV",
}

describe(`/contacts`, () => {

    // GET /contacts
    describe(`GET /contacts`, () => {

        it(`it should GET array of 3 contacts`, (done) => {
            chai.request(app)
                .get(`/contacts`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.instanceOf(Array);
                    expect(res.body.length).to.be.eql(3);
                    done();
                });
        });

    });

    // POST /contacts
    describe(`POST /contacts`, () => {

        it(`it should not POST an existing contact`, (done) => {
            chai.request(app)
                .post(`/contacts`)
                .send(existContactWithSameName)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.eql(`Error: contact with the name '${existContactWithSameName.name}' already exist`);
                    done();
                });
        });

        it(`it should POST a new contact`, (done) => {
            chai.request(app)
                .post(`/contacts`)
                .send(newContact)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.name).to.be.eql(newContact['name']);
                    expect(res.body.phone).to.be.eql(newContact['phone']);
                    done();
                });
        });

    });

    // GET /contacts/:contactName
    describe(`GET /contacts/:contactName`, () => {

        it(`it should not GET a non-existent contact`, (done) => {
            chai.request(app)
                .get(`/contacts/${notExistName}`)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.eql(`Error: contact with the name '${notExistName}' not found`);
                    done();
                });
        });

        it(`it should GET an existing contact`, (done) => {
            chai.request(app)
                .get(`/contacts/${names[0]}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.name).to.be.eql(names[0]);
                    done();
                });
        });

    });

    // PUT /contacts/:contactName
    describe(`PUT /contacts/:contactName`, () => {

        it(`it should not PUT a non-existent contact`, (done) => {
            chai.request(app)
                .put(`/contacts/${notExistName}`)
                .send(newContactBody)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.eql(`Error: contact with the name '${notExistName}' not found`);
                    done();
                });
        });

        it(`it should PUT an existing contact`, (done) => {
            chai.request(app)
                .put(`/contacts/${names[0]}`)
                .send(newContactBody)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.name).to.be.eql(names[0]);
                    expect(res.body.phone).to.be.eql(existContactBody.phone);
                    expect(res.body.email).to.be.eql(existContactBody.email);
                    expect(res.body.address).to.be.eql(newContactBody.address);
                    done();
                });
        });

    });

    // DELETE /contacts/:contactName
    describe(`DELETE /contacts/:contactName`, () => {

        it(`it should not DELETE a non-existent contact`, (done) => {
            chai.request(app)
                .delete(`/contacts/${notExistName}`)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.eql(`Error: contact with the name '${notExistName}' not found`);
                    done();
                });
        });

        it(`it should DELETE an existing contact`, (done) => {
            chai.request(app)
                .delete(`/contacts/${names[1]}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.eql(`delete contact with the name ${names[1]}`);
                    done();
                });
        });

    });

});