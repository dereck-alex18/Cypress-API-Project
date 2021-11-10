// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/// <reference types="Cypress" />


//User
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

//Login
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

//Products
Cypress.Commands.add('getAllProducts', () => {
    cy.request({
        method: 'GET',
        url: 'produtos',
        headers: { 'content-type': 'application/json' }
    });
});

Cypress.Commands.add('postProduct', (jsonBody, authToken, failOnStatusCode = true) => {
    cy.request({
        method: 'POST',
        url: 'produtos',
        body: jsonBody,
        headers: 
        {   'content-type': 'application/json',
            'Authorization': authToken
        },
        failOnStatusCode
    });
});

Cypress.Commands.add('putProduct', (jsonBody, authToken, productId, productName, failOnStatusCode = true) => {
    jsonBody.nome = productName;
    cy.request({
        method: 'PUT',
        url: `produtos/${productId}`,
        body: jsonBody,
        headers: 
        {   'content-type': 'application/json',
            'Authorization': authToken
        },
        failOnStatusCode
    });
});

Cypress.Commands.add('deleteProduct', (authToken, productId) => {
    cy.request({
        method: 'DELETE',
        url: `produtos/${productId}`,
        headers: 
        {   'content-type': 'application/json',
            'Authorization': authToken
        },
    });
});

Cypress.Commands.add('productBuilder', (body) => {
    cy.fixture('products').then(product => {
        body.nome = product.nome,
        body.preco = product.preco,
        body.descricao = product.descricao,
        body.quantidade = product.quantidade
    });
});

