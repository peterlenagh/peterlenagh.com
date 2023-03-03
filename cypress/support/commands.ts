/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//
declare global {
  namespace Cypress {
    interface Chainable {
      isInView(element: string, parentElement: string): Chainable<void>
      isNotInView(element: string, parentElement: string): Chainable<void>
    }
  }
}

Cypress.Commands.add("isInView", (element, parentElement) => {
  cy.log(`check if ${element} isInView within ${parentElement}.`);
  cy.get(element).then(($element) => {
    cy.get(parentElement).then(($parentElement) => {
      const el = $element[0];
      const parent = $parentElement[0];
      const elemOffsetLeft = el.offsetLeft;
      const elemWidth = el.offsetWidth;
      const parentScrollLeft = parent.scrollLeft;
      const parentWidth = parent.offsetWidth;
      const viewRange = [parentScrollLeft, parentScrollLeft + parentWidth];
      const elemRange = [elemOffsetLeft + 1, elemOffsetLeft + elemWidth - 1];
      expect(elemRange[0]).within(viewRange[0], viewRange[1]);
      expect(elemRange[1]).within(viewRange[0], viewRange[1]);
    });
  });
});

Cypress.Commands.add("isNotInView", (element, parentElement) => {
  cy.log(`check if ${element} isNotInView within ${parentElement}.`);
  cy.get(element).then(($element) => {
    cy.get(parentElement).then(($parentElement) => {
      const el = $element[0];
      const parent = $parentElement[0];
      const elemOffsetLeft = el.offsetLeft;
      const elemWidth = el.offsetWidth;
      const parentScrollLeft = parent.scrollLeft;
      const parentWidth = parent.offsetWidth;
      const viewRange = [parentScrollLeft, parentScrollLeft + parentWidth];
      const elemRange = [elemOffsetLeft + 1, elemOffsetLeft + elemWidth - 1];
      expect(elemRange[0]).not.within(viewRange[0], viewRange[1]);
      expect(elemRange[1]).not.within(viewRange[0], viewRange[1]);
    });
  });
});

export {};
