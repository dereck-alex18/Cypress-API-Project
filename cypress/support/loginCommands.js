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
    cy.fixture('invalidUser').then(user => {
        body.email = user.email,
        body.password = user.password
    });
});