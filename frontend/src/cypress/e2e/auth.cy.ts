/// <reference types="Cypress" />

describe('It can create a user', () => {
	let testName = 'cy_user_name';
	let testUsername = 'cy_email@test.dk';
	let testPassword = 'CyPass_1,';
	let testMemberUsername = 'cy_mu_username';

	it('can reset test', () => {
		cy.visit('http://localhost:7021/resetTest');
		cy.wait(2000);
		cy.get('#testReset').should('contain', 'yes');
	});

	it('it has a register button', () => {
		cy.visit('http://localhost:7021/');
		cy.get('button[name="register').should('exist');
	});

	it('can show the register page', () => {
		cy.get('button[name="register').click();
		cy.get('#field-name').should('be.visible');
	});

	it('can create a random user', () => {
		cy.get('input#field-name').clear().type(testName);
		cy.get('input#field-username').clear().type(testUsername);
		cy.get('input#field-password').clear().type(testPassword);
		cy.get('input#field-password_confirmation').clear().type(testPassword);
		cy.get('button[name="register').click();

		cy.get('button[name="login"]').should('contain', 'Log ind');
		cy.get('input#field-password').invoke('attr','autocomplete').should('eq','current-password');
	});

	it('can login', () => {
		cy.get('input#field-username').clear().type(testUsername);
		cy.get('input#field-password').clear().type(testPassword);
		cy.get('button[name="login"]').click();

		cy.get('#usernameLoggedIn').contains(testName);
	});

	it('can logout', () => {
		cy.get('#logoutBtn').click();

		cy.get('#logoutBtn').should('not.be.exist');
	});

	it('can reset test', () => {
		cy.visit('http://localhost:7021/resetTest');
		cy.wait(2000);
		cy.get('#testReset').should('contain', 'yes');
	});
});
