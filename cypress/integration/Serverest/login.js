/// <reference types="Cypress" />

describe('Test login endpoint', () =>{
    let body = {};
    let userId

    //Post
    it('should return success message auth token and status 200 to login successfully', () => {
        cy.userBuilder(body); //Custom command
        cy.postUser(body)
        .then((response) => {
            userId = response.body._id;
        });

        cy.postLogin(body)
        .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal('Login realizado com sucesso');
        });
    });

    it('Should return failure message and status 401 to invalid email or password', () => {
        cy.loginUserBuilder(body); //Custom command

        cy.postLogin(body, false)
        .then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to.equal('Email e/ou senha inválidos');
        });
    });

    after(() => {
        cy.deleteUser(userId);
    })
});