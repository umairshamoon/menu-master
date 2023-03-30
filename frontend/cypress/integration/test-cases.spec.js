const userCorrectEmailAddress = 'menu-test-cases@yahoo.com'
const userInCorrectEmailAddress = 'menu-test-cases-incorrect-email@yahoo.com'
const userInValidEmailAddress = 'invalid-email-address'
const userPassword = 'SafePassword678'
const userName = 'test-user'

describe("User can signup", () => {
    it("renders homepage correctly", () => {
        cy.visit("/");
        cy.get("#email").should("exist");
    });


    it("renders signup page correctly", () => {
        cy.visit("/signupChef");
        cy.get("#email").should("exist");
    });


    it("user cannot signup with wrong email address", () => {
        cy.visit("/signupChef");
        cy.get('#userName').type(userName);
        cy.get('#email').type(userInValidEmailAddress);
        cy.get('#password').type(userPassword);
        cy.get('.MuiButton-contained > .MuiButton-label').click();
        cy.get('.error').should('exist')
    });

    it("user can signup", () => {
        cy.visit("/signupChef");
        cy.get('#userName').type(userName);
        cy.get('#email').type(userCorrectEmailAddress);
        cy.get('#password').type(userPassword);
        cy.get('.MuiButton-contained > .MuiButton-label').click();
        cy.get('.MuiAlert-message').should('exist')
    });
});

describe("User can signin", () => {
    it("renders homepage correctly", () => {
        cy.visit("/");
        cy.get("#email").should("exist");
    });


    it("renders signin page correctly", () => {
        cy.visit("/loginChef");
        cy.get("#email").should("exist");
    });

    it("user cannot signin with wrong email address, validation should work", () => {
        cy.visit("/loginChef")
        cy.get('#email').type(userInValidEmailAddress);
        cy.get('#password').type(userPassword);
        cy.get('.MuiButton-label').click();
        cy.get('.error').should('exist')
    });

    it("user cannot signin with wrong email address", () => {
        cy.visit("/loginChef")
        cy.get('#email').type(userInCorrectEmailAddress);
        cy.get('#password').type(userPassword);
        cy.get('.MuiButton-label').click();
        cy.get('.MuiAlert-message').should('exist')
    });

    it("user can signin", () => {
        cy.visit("/loginChef")
        cy.get('#email').type(userCorrectEmailAddress);
        cy.get('#password').type(userPassword);
        cy.get('.MuiButton-label').click();
        cy.get('#welcome').should('exist');
    });

    it("user can add recipe", () => {
        cy.visit("/loginChef")
        cy.get('#email').type(userCorrectEmailAddress);
        cy.get('#password').type(userPassword);
        cy.get('.MuiButton-label').click();
        cy.get('#welcome').should('exist');
        cy.visit("/dashboard");
        cy.get('.MuiButton-label').click();
        cy.get("#add-ingredients").should("exist")


        cy.get('#recipeName').type('Biryani' + Math.floor((Math.random() * 1000) + 1));
        // cy.get('#recipeDescription').click();

        cy.get('#recipeServings').type('4');

        cy.get('#prepTime').type('2 hour');

        cy.get('#cookTime').type('2 hour');

        cy.get('#totalCookTime').type('3 hour');

        cy.get('#difficultyLevel').type('medium');
        cy.get('[data-testid=Publish-btn] > .MuiButton-label').click();
        cy.get('.MuiAlert-message').should('exist');

    });

    it("user can edit recipes", () => {
        cy.visit("/loginChef")
        cy.get('#email').type(userCorrectEmailAddress);
        cy.get('#password').type(userPassword);
        cy.get('.MuiButton-label').click();
        cy.get('#welcome').should('exist');
        cy.visit("/recipesList");
        cy.get(':nth-child(1) > :nth-child(8) > .MuiButtonBase-root > .MuiButton-label').click();
        cy.get('[style="position: fixed; z-index: 1300; inset: 0px;"] > .MuiPaper-root > .MuiList-root > :nth-child(2)').click();

        cy.get('#recipeName').type('Biryani' + Math.floor((Math.random() * 1000) + 1));

        cy.get('#recipeServings').type('4');

        cy.get('#prepTime').type('2 hour');

        cy.get('#cookTime').type('2 hour');

        cy.get('#totalCookTime').type('3 hour');

        cy.get('#difficultyLevel').type('medium');

        cy.get('[style="padding-top: 10px;"] > .MuiButtonBase-root').click();
        cy.get('.MuiAlert-message').should('exist');

    });

    it("user can delete recipes", () => {
        cy.visit("/loginChef")
        cy.get('#email').type(userCorrectEmailAddress);
        cy.get('#password').type(userPassword);
        cy.get('.MuiButton-label').click();
        cy.get('#welcome').should('exist');
        cy.visit("/recipesList");
        cy.get(':nth-child(1) > :nth-child(8) > .MuiButtonBase-root > .MuiButton-label').click();
        cy.get('[style="position: fixed; z-index: 1300; inset: 0px;"] > .MuiPaper-root > .MuiList-root > :nth-child(3)').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`Recipe deleted`)
          })

    });
    
});

describe("User can logout", () => {
    it("renders homepage correctly", () => {
        cy.visit("/");
        cy.get("#email").should("exist");
    });


    it("renders signin page correctly", () => {
        cy.visit("/loginChef");
        cy.get("#email").should("exist");
    });

    it("user cannot signin with wrong email address, validation should work", () => {
        cy.visit("/loginChef")
        cy.get('#email').type(userInValidEmailAddress);
        cy.get('#password').type(userPassword);
        cy.get('.MuiButton-label').click();
        cy.get('.error').should('exist')
    });

    it("user cannot signin with wrong email address", () => {
        cy.visit("/loginChef")
        cy.get('#email').type(userInCorrectEmailAddress);
        cy.get('#password').type(userPassword);
        cy.get('.MuiButton-label').click();
        cy.get('.MuiAlert-message').should('exist')
    });

    it("user can signin", () => {
        cy.visit("/loginChef")
        cy.get('#email').type(userCorrectEmailAddress);
        cy.get('#password').type(userPassword);
        cy.get('.MuiButton-label').click();
        cy.get('#welcome').should('exist');
    });

    it("user can logout", () => {
        cy.visit("/loginChef")
        cy.get('#email').type(userCorrectEmailAddress);
        cy.get('#password').type(userPassword);
        cy.get('.MuiButton-label').click();
        cy.get('#welcome').should('exist');
        cy.visit("/dashboard");
        cy.get('[style="padding-left: 15px; font-size: 15px;"]').click();
        cy.get('[style="position: fixed; z-index: 1300; inset: 0px;"] > .MuiPaper-root > .MuiList-root > :nth-child(3)').click();
        cy.get("#email").should("exist");
    });

    
});