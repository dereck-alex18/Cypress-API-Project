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
    cy.fixture('users').then(users => {
        body.nome = users[0].nome,
        body.email = users[0].email,
        body.password = users[0].password,
        body.administrador = users[0].administrador
    });
});
