/// <reference types="Cypress" />

Cypress.Commands.add('postLogin', (jsonBody, failOnStatusCode = true) => {
    cy.request({
        method: 'POST',
        url: 'login',
        body: {email: jsonBody.email, password: jsonBody.password},
        headers: { 'content-type': 'application/json' },
        failOnStatusCode
    });
});

Cypress.Commands.add('loginUserBuilder', (body) => {
    cy.fixture('users').then(users => {
        body.email = users[1].email,
        body.password = users[1].password
    });
});