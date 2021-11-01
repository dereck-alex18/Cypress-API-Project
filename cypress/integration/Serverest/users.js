/// <reference types="Cypress" />

describe('HTTP request serverest', () => {
    let userId;
    const body = {};

    it('Should make a GET resquest and return 200', () => {
        cy.getUsers()
        .then((response) => {
            expect(response.body).have.property('usuarios');
            expect(response.body.quantidade).to.equal(1);
            expect(response.status).to.equal(200);
    
        });
    });

    it('Should make a POST request and return 201', () => {
        cy.userBuilder(body); //Custom command

        cy.postUser(body)
        .then((response) => {
            expect(response.status).to.equal(201);
            expect(response.body).have.property('_id');
            expect(response.body.message).to.equal('Cadastro realizado com sucesso');
            userId = response.body._id
        });
    });

    it('Should make a POST request and return 400', () => {
        cy.userBuilder(body); //Custom command

        cy.postUser(body, false)
        .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to.equal('Este email já está sendo usado');
        });
    });

    it('Should make a PUT request and return 200', () => {
        cy.putUser(body, userId, 'test@test.com')
        .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal('Registro alterado com sucesso');
        });
    });

    it('Should make a DELETE request and return 200', () => {
        cy.deleteUser(userId)
        .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal('Registro excluído com sucesso');
        });
    });
});