/// <reference types="Cypress" />

describe('Test user endpoint', () => {
    let userId;
    const body = {};
    const ids = [];

    //GET
    it('Should return users and status 200 to list users', () => {
        cy.getUsers()
        .then((response) => {
            expect(response.body).have.property('usuarios');
            expect(response.body.quantidade).to.equal(1);
            expect(response.status).to.equal(200);
    
        });
    });

    //POST
    it('Should return successful message and 201 status to register Successfully', () => {
        cy.userBuilder(body); //Custom command
        cy.postUser(body)
        .then((response) => {
            expect(response.status).to.equal(201);
            expect(response.body).have.property('_id');
            expect(response.body.message).to.equal('Cadastro realizado com sucesso');
            userId = response.body._id
            ids.push(userId);
        });
    });

    it('Should return fail message and 400 status to already exist a user with this name', () => {
        cy.postUser(body, false)
        .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to.equal('Este email já está sendo usado');
        });
    });

    //PUT
    it('Should return error message and status 400 to email already in use', () => {
        cy.putUser(body, userId, 'fulano@qa.com', false)
        .then((response) => {
            console.log(`resp invalid put: ${body.email}`);
            expect(response.status).to.equal(400);
            expect(response.body.message).to.equal('Este email já está sendo usado');
        });
    });

    it('Should Return Success Message And Status 200 To Update Successfully', () => {
        cy.putUser(body, userId, 'test@test.com')
        .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal('Registro alterado com sucesso');
        });
    });

    it('Should return success message and status 201 to register successfully', () => {
        cy.putUser(body, 'xxx', 'ze@test.com')
        .then((response) => {
            expect(response.status).to.equal(201);
            expect(response.body.message).to.equal('Cadastro realizado com sucesso');
            userId = response.body._id
            ids.push(userId);
        });
    });

    //Delete
    it('Should remove user return success message and status 200 to user deleted successfully', () => {
        cy.deleteUser(userId)
        .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal('Registro excluído com sucesso');
        });
    });

    after(() => {
        ids.forEach(id => {
            cy.deleteUser(id);
        });
        
    });
});