import {
  addBtn,
  circle,
  clearBtn,
  delBtn
} from "../constants/constants";

const time = 500;

describe('Корректность работы очереди', () => {

  const addFirstElem = (value) => {
    cy.clock()
    cy.get('form')
      .within(() => {
        cy.get('input').type(value)
        cy.get(addBtn).should('be.not.disabled')
        cy.get(delBtn).should('be.disabled')
        cy.get(clearBtn).should('be.disabled')
      })
    cy.tick(time)
    cy.get('form')
      .within(() => {
        cy.get(addBtn).click()
        cy.get(delBtn).should('be.disabled')
        cy.get(clearBtn).should('be.disabled')
      })

    cy.get(circle).contains(value).parent()
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_changing'))
    cy.tick(time)
  }

  const addNextElem = (value) => {
    cy.clock()
    cy.tick(time)
    cy.get('form')
      .within(() => {
        cy.get('input').type(value)
        cy.get(addBtn).should('be.not.disabled')
        cy.get(delBtn).should('be.not.disabled')
        cy.get(clearBtn).should('be.not.disabled')
      })
    cy.tick(time)
    cy.get('form')
      .within(() => {
        cy.get(addBtn).click()
        cy.get(delBtn).should('be.disabled')
        cy.get(clearBtn).should('be.disabled')
      })
    cy.get(circle).contains(value).parent()
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_changing'))
    cy.tick(time)
  }

  beforeEach(() => {
    cy.visit(`/`)
    cy.get('a[href*="/queue"]').click()
    cy.contains('Очередь')
  });

  it('Если в инпуте пусто, то кнопка добавления недоступна.', () => {
    cy.get('form').within(() => {
      cy.get('input').should('have.value', '')
      cy.get(addBtn).should('be.disabled')
      cy.get(delBtn).should('be.disabled')
      cy.get(clearBtn).should('be.disabled')
    })
  })

  it('Проверить корректность добавления элемента в очередь', () => {
    cy.clock()

    cy.get(circle).should('have.length', 8)
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_default'))

    addFirstElem(1)

    cy.get(circle).then(el => {
      cy.get(el[0])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_default'))
      cy.get(el[0])
        .children()
        .should('have.text', '1')
      cy.get(el[0])
        .siblings('div').contains('head')
        .siblings('div').contains('tail')
    })

    addNextElem(2)

    cy.get(circle).then(el => {
      cy.get(el[0])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_default'))
      cy.get(el[0])
        .children()
        .should('have.text', '1')
      cy.get(el[0])
        .siblings('div').contains('head')
      cy.get(el[1])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_default'))
      cy.get(el[1])
        .children()
        .should('have.text', '2')
      cy.get(el[1])
        .siblings('div').contains('tail')
    })

  })

  it('Проверить корректность удаления элемента', () => {

    cy.clock()
    addFirstElem(1)
    cy.tick(time)
    addNextElem(2)

    cy.get('form').within(() => {
      cy.get('input').should('have.value', '')
      cy.get(addBtn).should('be.disabled')
      cy.get(delBtn).click()
    })
    cy.get(circle).then(el => {
      cy.get(el[0])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_changing'))
      cy.get(el[0])
        .children()
        .should('be.empty')

      cy.tick(time)

      cy.get(el[1])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_default'))
      cy.get(el[1])
        .children()
        .should('have.text', '2')
      cy.get(el[1])
        .siblings('div').contains('tail')
        .siblings('div').contains('head')
    })
  })

  it('Проверить корректность работы кнопки Очистить', () => {
    cy.clock()
    addFirstElem(1)

    cy.tick(time)

    addNextElem(2)

    cy.tick(time)

    cy.get('form').within(() => {
      cy.get('input').should('have.value', '')
      cy.get(addBtn).should('be.disabled')
      cy.get(clearBtn).click()
    })

    cy.tick(time)

    cy.get('form')
    .within(() => {
      cy.get('input').should('have.value', '')
      cy.get(addBtn).should('be.disabled')
      cy.get(delBtn).should('be.disabled')
      cy.get(clearBtn).should('be.disabled')
    })
  })

})