/// <reference types="Cypress" />

describe('Test product endpoint', () => {
    const body = {};
    let userToken = ''; // Refactor the way to get token
    let productId = '';
    let productId201 = '';
    let userId;
    let nonAdminToken;

    //Get
    it('Should return products and status 200 to list products', () => {
        cy.getAllProducts()
        .then((response) => {
            expect(response.body.quantidade).to.equal(2);
            expect(response.status).to.equal(200);
    
        });
    });

    //Post
    it('Should return successful message and status 201 To register successfully', () => {
        cy.postLogin({email: 'fulano@qa.com', password: 'teste'})
        .then(response => {
            userToken = response.body.authorization;
            cy.productBuilder(body);
            cy.postProduct(body, userToken)
            .then(response => {
                expect(response.body.message).to.equal('Cadastro realizado com sucesso');
                expect(response.status).to.equal(201);
                productId = response.body._id;
            });
        });    
    });

    it('Should return fail message and status 400 to already exist a product with this name', () => {
        cy.productBuilder(body);
        body.nome = 'Logitech MX Vertical';
        cy.postProduct(body, userToken, false)
        .then(response => {
            expect(response.body.message).to.equal('Já existe produto com esse nome');
            expect(response.status).to.equal(400);
            
        });
    });

    it('Should return fail message and status 401 to nonexisting invalid or expired token', () => {
        cy.productBuilder(body);
        cy.postProduct(body, 'xxx', false)
        .then(response => {
            expect(response.body.message).to.equal('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
            expect(response.status).to.equal(401);   
        });
    });

    it('Should return fail message and status 403 to exclusive route for admins', () => {
        const user = {}
        cy.userBuilder(user);
        cy.postUser(user)
        .then(response => {
            userId = response.body._id;
            cy.postLogin({email: user.email, password: user.password})
            .then(response => {
                nonAdminToken = response.body.authorization;
                cy.productBuilder(body);
                cy.postProduct(body, nonAdminToken, false)
                .then(response => {
                    expect(response.body.message).to.equal('Rota exclusiva para administradores');
                    expect(response.status).to.equal(403);
                });
            });
        });
    });

    //Put
    it('Should return success and status 200 to update successfully', () => {
        cy.productBuilder(body);
        cy.putProduct(body, userToken, productId, 'iPhone12')
        .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal('Registro alterado com sucesso');
        });
    });

    it('Should return success and status 201 Tt register successfully', () => {
        cy.productBuilder(body);
        cy.putProduct(body, userToken, 'xxx', 'iPhone13', false)
        .then((response) => {
            expect(response.status).to.equal(201);
            expect(response.body.message).to.equal('Cadastro realizado com sucesso');
            productId201 = response.body._id
        });
    });

    it('Should return error and status 400 to already exist a product with this name', () => {
        cy.productBuilder(body);
        cy.putProduct(body, userToken, productId, 'Samsung 60 polegadas', false)
        .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to.equal('Já existe produto com esse nome');
        });
    });
         
    it('Should return error and status 401 to nonexisting, invalid or expired token', () => {
        cy.productBuilder(body);
        cy.putProduct(body, 'xxx', productId, 'iPhone12', false)
        .then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to.equal('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
        });
    });

    it('Should return error and status 403 to exclusive route for admins', () => {
        cy.productBuilder(body);
        cy.putProduct(body, nonAdminToken, productId, 'iPhone12', false)
        .then((response) => {
            expect(response.status).to.equal(403);
            expect(response.body.message).to.equal('Rota exclusiva para administradores');
        });
    });

    //Delete
    it('Should remove product return success message and status 200 to product deleted successfully', () => {
        cy.deleteProduct(userToken, productId)
        .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal('Registro excluído com sucesso');
        });
    });

    it('Should not remove product return error message and status 403 to route exclusive for admins', () => {
        cy.deleteProduct(nonAdminToken, productId201, false)
        .then((response) => {
            expect(response.status).to.equal(403);
            expect(response.body.message).to.equal('Rota exclusiva para administradores');
        });
    });

    it('Should not remove product return error message and status 401 to nonexistent invalid or expired token', () => {
        cy.deleteProduct('xxx', productId201, false)
        .then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to.equal('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
        });
    });

    after(() => {
        cy.deleteUser(userId);
        cy.deleteProduct(userToken, productId201);
    });
});

