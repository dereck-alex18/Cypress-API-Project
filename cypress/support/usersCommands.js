/// <reference types="Cypress" />

Cypress.Commands.add('getUsers', () => {
    cy.request({
        method: 'GET',
        url: 'usuarios',
        headers: { 'content-type': 'application/json' }
    });
});

Cypress.Commands.add('postUser', (jsonBody, failOnStatusCode = true) => {
    cy.request({
        method: 'POST',
        url: 'usuarios',
        body: jsonBody,
        headers: { 'content-type': 'application/json' },
        failOnStatusCode
    });
});

Cypress.Commands.add('putUser', (jsonBody, userId, userEmail, failOnStatusCode = true) => {
    jsonBody.email = userEmail;
    console.log(jsonBody.email);
    cy.request({
        method: 'PUT',
        url: `usuarios/${userId}`,
        body: jsonBody,
        headers: { 'content-type': 'application/json' },
        failOnStatusCode
    });
});

Cypress.Commands.add('deleteUser', userId => {
    cy.request({
        method: 'DELETE',
        url: `usuarios/${userId}`,
        headers: { 'content-type': 'application/json' }
    });
});

Cypress.Commands.add('userBuilder', (body) => {
    cy.fixture('user').then(user => {
        body.nome = user.nome,
        body.email = user.email,
        body.password = user.password,
        body.administrador = user.administrador
    });
});
