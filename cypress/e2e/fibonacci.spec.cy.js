export const timeFibo = 500;

describe('Корректность работы разворота строки', () => {
  beforeEach(() => {
    cy.visit(`/`)
    cy.get('a[href*="/fibonacci"]').click()
    cy.contains('Последовательность Фибоначчи')
  });
  it('Если в инпуте пусто, то кнопка добавления недоступна.', () => {
    cy.get('form').within(() => {
      cy.get('input').should('have.value', '')
      cy.get('button').should('be.disabled')
    })
  })

  it('Проверить корректность работы алгоритма фиббоначи', () => {
    cy.clock()
    cy.get('form').within(() => {
      cy.get('input').type('5')
      cy.get('button').click()
      cy.get('button').should('be.disabled')
    })
    cy.tick(timeFibo)

    cy.get('div[class*="circle_circle"]').children().should('have.length', '1').should('have.text', '1')

    cy.tick(timeFibo)

    cy.get('div[class*="circle_circle"]').children().should('have.length', '2').should('have.text', '11')

    cy.tick(timeFibo)

    cy.get('div[class*="circle_circle"]').children().should('have.length', '3').should('have.text', '112')

    cy.tick(timeFibo)

    cy.get('div[class*="circle_circle"]').children().should('have.length', '4').should('have.text', '1123')

    cy.tick(timeFibo)

    cy.get('div[class*="circle_circle"]').children().should('have.length', '5').should('have.text', '11235')

    cy.tick(timeFibo)

    cy.get('div[class*="circle_circle"]').children().should('have.length', '6').should('have.text', '112358')

    cy.tick(timeFibo)

    cy.get('form').within(() => {
      cy.get('input').should('have.value', '')
      cy.get('button').should('be.disabled')
    })
  })
})