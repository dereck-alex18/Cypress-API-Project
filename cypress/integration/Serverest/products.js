/// <reference types="Cypress" />

describe('HTTP request serverest', () => {
    const body = {};
    let userToken = ''; // Refactor the way to get token
    let productId = '';
    let userId;
    let nonAdminToken;
    it('Should make a GET resquest and return 200', () => {
        cy.getAllProducts()
        .then((response) => {
            expect(response.body.quantidade).to.equal(2);
            expect(response.status).to.equal(200);
    
        });
    });

    it('Should make a POST resquest and return 201', () => {
        cy.postLogin({email: 'beltrano@qa.com.br', password: 'teste'})
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

    it('Should make a POST resquest and return 400', () => {
        cy.productBuilder(body);
        body.nome = 'Logitech MX Vertical';
        cy.postProduct(body, userToken, false)
        .then(response => {
            expect(response.body.message).to.equal('Já existe produto com esse nome');
            expect(response.status).to.equal(400);
            
        });
    });

    it('Should make a POST resquest and return 401', () => {
        cy.productBuilder(body);
        cy.postProduct(body, 'xxx', false)
        .then(response => {
            expect(response.body.message).to.equal('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
            expect(response.status).to.equal(401);   
        });
    });

    it('Should make a POST resquest and return 403', () => {
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
         
    it('Should make a PUT request and return 401', () => {
        cy.productBuilder(body);
        cy.putProduct(body, 'xxx', productId, 'iPhone12', false)
        .then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to.equal('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
        });
    });


    it('Should make a DELETE request and return 200', () => {
        cy.deleteProduct(userToken, productId)
        .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal('Registro excluído com sucesso');
        });
    });

    after(() => {
        cy.deleteUser(userId);
    });
});

