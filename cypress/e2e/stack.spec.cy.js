import {
  addBtn,
  circle,
  clearBtn,
  delBtn
} from "../constants/constants";

const time = 500;

describe('Корректность работы стека', () => {

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
        cy.get('a[href*="/stack"]').click()
        cy.contains('Стек')
      });

      it('Если в инпуте пусто, то кнопка добавления недоступна.', () => {
        cy.get('form').within(() => {
          cy.get('input').should('have.value', '')
          cy.get(addBtn).should('be.disabled')
          cy.get(delBtn).should('be.disabled')
          cy.get(clearBtn).should('be.disabled')
        })
      })

      it('Проверить корректность добавления элемента в стек', () => {
        cy.clock()
        addFirstElem(1)

        cy.get(circle).then(el => {
          cy.get(el[0])
            .invoke('attr', 'class')
            .then(classList => expect(classList).contains('circle_default'))
          cy.get(el[0])
            .children()
            .should('have.text', '1')
          cy.get(el[0])
            .siblings('div').contains('top')
        })

        addNextElem(2)

        cy.get(circle).then(el => {
          cy.get(el[0])
            .invoke('attr', 'class')
            .then(classList => expect(classList).contains('circle_default'))
          cy.get(el[0])
            .children()
            .should('have.text', '1')
          cy.get(el[1])
            .invoke('attr', 'class')
            .then(classList => expect(classList).contains('circle_default'))
          cy.get(el[1])
            .children()
            .should('have.text', '2')
          cy.get(el[1])
            .siblings('div').contains('top')
        })

      })

      it('Проверить корректность удаления элемента', () => {

        cy.clock()
        addFirstElem(1)
        cy.tick(time)
        addNextElem(2)
        cy.tick(time)
        cy.get('form').within(() => {
          cy.get('input').should('have.value', '')
          cy.get(addBtn).should('be.disabled')
          cy.get(delBtn).click()
        })

        cy.get(circle).then(el => {
          cy.get(el[0])
            .invoke('attr', 'class')
            .then(classList => expect(classList).contains('circle_default'))
          cy.get(el[0])
            .children()
            .should('have.text', '1')
          cy.get(el[1])
            .invoke('attr', 'class')
            .then(classList => expect(classList).contains('circle_changing'))
        })
        cy.tick(time)
        cy.get(circle).then(el => {
          cy.get(el[0])
            .invoke('attr', 'class')
            .then(classList => expect(classList).contains('circle_default'))
          cy.get(el[0])
            .children()
            .should('have.text', '1')
          cy.get(el[0])
            .siblings('div').contains('top')
          // cy.get(el[0])
          //   .siblings('div').contains('top')

        })
      })
      })