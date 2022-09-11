/// <reference types="Cypress" />

describe('It can create a user', () => {
	let testName = 'cy_user_name';
	let testUsername = 'cy_email@test.dk';
	let testPassword = 'CyPass_1,';
	let testMemberUsername = 'cy_mu_username';

	it('can reset test', () => {
		cy.visit('http://localhost:7011/resetTest');
		cy.wait(2000);
		cy.get('#testReset').should('contain', 'yes');
	});

	it('it has a register button', () => {
		cy.visit('http://localhost:7011/');
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

	it('can add a new member to a member update', () => {
		cy.get('input#field-username').clear().type(testUsername);
		cy.get('input#field-password').clear().type(testPassword);
		cy.get('button[name="login"]').click();
		cy.get('#main-menu a[data-name="members"]').click();
		cy.get('input#field-pronouns').should('be.visible');
		cy.get('input#field-username').type(testMemberUsername);
		cy.get('button[name="submitMember"]').click();

		cy.wait(2500);
		cy.get('#members .member').last().find('.username a').should('be.visible').should('contain.text', testMemberUsername);
	});

	it('can reset test', () => {
		cy.visit('http://localhost:7011/resetTest');
		cy.wait(2000);
		cy.get('#testReset').should('contain', 'yes');
	});
});
