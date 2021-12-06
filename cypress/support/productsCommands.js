/// <reference types="Cypress" />

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

Cypress.Commands.add('deleteProduct', (authToken, productId, failOnStatusCode = true) => {
    cy.request({
        method: 'DELETE',
        url: `produtos/${productId}`,
        headers: 
        {   'content-type': 'application/json',
            'Authorization': authToken
        },
        failOnStatusCode
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