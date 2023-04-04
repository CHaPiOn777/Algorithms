import {
  addBtn,
  addHead,
  addIndex,
  addTail,
  circle,
  clearBtn,
  delBtn,
  delHead,
  delIndex,
  delTail,
  form,
  formIndex,
  inputIndex
} from "../constants/constants";

const time = 500;

describe('Корректность работы списка', () => {

  const addHeadElem = (value) => {
    cy.clock()
    cy.get(form)
      .within(() => {
        cy.get('input').type(value)
        cy.get(addHead).should('be.not.disabled')
        cy.get(addTail).should('be.not.disabled')
        cy.get(delHead).should('be.not.disabled')
        cy.get(delTail).should('be.not.disabled')
      })
    cy.get(formIndex)
      .within(() => {
        cy.get(addIndex).should('be.disabled')
        cy.get(delIndex).should('be.disabled')
      })
    cy.tick(time)
    cy.get(form)
      .within(() => {
        cy.get(addHead).click()
        cy.get(addTail).should('be.disabled')
        cy.get(delHead).should('be.disabled')
        cy.get(delTail).should('be.disabled')
      })
    cy.get(formIndex)
      .within(() => {
        cy.get(addIndex).should('be.disabled')
        cy.get(delIndex).should('be.disabled')
      })
    cy.get(circle).contains(value).parent()
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_small'))
    cy.get(circle).contains(value).parent()
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_changing'))
    cy.tick(time)
  }

  const addTailElem = (value) => {
    cy.clock()
    cy.get(form)
      .within(() => {
        cy.get('input').type(value)
        cy.get(addHead).should('be.not.disabled')
        cy.get(addTail).should('be.not.disabled')
        cy.get(delHead).should('be.not.disabled')
        cy.get(delTail).should('be.not.disabled')
      })
    cy.get(formIndex)
      .within(() => {
        cy.get(addIndex).should('be.disabled')
        cy.get(delIndex).should('be.disabled')
      })
    cy.tick(time)
    cy.get(form)
      .within(() => {
        cy.get(addTail).click()
        cy.get(addHead).should('be.disabled')
        cy.get(delHead).should('be.disabled')
        cy.get(delTail).should('be.disabled')
      })
    cy.get(formIndex)
      .within(() => {
        cy.get(addIndex).should('be.disabled')
        cy.get(delIndex).should('be.disabled')
      })
    cy.get(circle).contains(value).parent()
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_small'))
    cy.get(circle).contains(value).parent()
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_changing'))
    cy.tick(time)
  }
  const addIndexElem = (value, index) => {
    cy.clock()
    cy.get(form)
      .within(() => {
        cy.get('input').type(value)
        cy.get(addHead).should('be.not.disabled')
        cy.get(addTail).should('be.not.disabled')
        cy.get(delHead).should('be.not.disabled')
        cy.get(delTail).should('be.not.disabled')
      })
    cy.get(formIndex)
      .within(() => {
        cy.get(inputIndex).type(index)
        cy.get(addIndex).should('be.not.disabled')
        cy.get(delIndex).should('be.not.disabled')
      })
    cy.tick(time)
    cy.get(formIndex)
      .within(() => {
        cy.get(addIndex).click()
        cy.get(delIndex).should('be.disabled')
      })
    cy.get(form)
      .within(() => {
        cy.get(addTail).should('be.disabled')
        cy.get(addHead).should('be.disabled')
        cy.get(delHead).should('be.disabled')
        cy.get(delTail).should('be.disabled')
      })

    cy.get(circle).contains(value).parent()
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_small'))
    cy.get(circle).contains(value).parent()
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_changing'))
    cy.tick(time)
  }

  beforeEach(() => {
    cy.visit(`/`)
    cy.get('a[href*="/list"]').click()
    cy.contains('Связный список')
  });

  // it('Если в инпуте пусто, то кнопка добавления недоступна.', () => {
  //   cy.get(form)
  //     .within(() => {
  //       cy.get('input').should('have.value', '')
  //       cy.get(addHead).should('be.disabled')
  //       cy.get(addTail).should('be.disabled')
  //       cy.get(delHead).should('be.not.disabled')
  //       cy.get(delTail).should('be.not.disabled')

  //     })
  //   cy.get(formIndex)
  //     .within(() => {
  //       cy.get(inputIndex).should('have.value', '')
  //       cy.get(addIndex).should('be.disabled')
  //       cy.get(delIndex).should('be.disabled')

  //     })
  // })
  // it('Проверить корректность начальной отрисовки', function () {
  //   cy.get(circle).should('have.length', 4)
  //     .invoke('attr', 'class')
  //     .then(classList => expect(classList).contains('circle_default'))

  //   cy.get(circle).then((elem) => {
  //     cy.get(elem[0])
  //       .children().should('have.text', '0')

  //     cy.get(elem[1])
  //       .children().should('have.text', '34')

  //     cy.get(elem[2])
  //       .children().should('have.text', '8')

  //     cy.get(elem[3])
  //       .children().should('have.text', '1')
  //   })

  //   cy.get(circle).should('have.length', 4)
  //     .invoke('attr', 'class')
  //     .then(classList => expect(classList).contains('circle_default'))
  // })

  it('Проверить корректность добавления в head.', function () {
    cy.clock()
    addHeadElem('2')
    cy.get(circle).then((el) => {
      cy.get(el[0])
        .children().should('have.text', '2')
      cy.get(el[0])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_modified'))
      cy.get(el[0])
        .siblings('div').contains('head')

      cy.get(el[1])
        .children().should('have.text', '0')
      cy.get(el[1])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_default'))

      cy.get(el[2])
        .children().should('have.text', '34')
      cy.get(el[2])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_default'))

      cy.get(el[3])
        .children().should('have.text', '8')
      cy.get(el[3])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_default'))

      cy.get(el[4])
        .children().should('have.text', '1')
      cy.get(el[4])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_default'))

    })

    cy.tick(time)

    cy.get(circle)
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_default'))
  })
  // })
  // it('Проверить корректность добавления элемента в очередь', () => {
  //   cy.clock()

  //   cy.get(circle).should('have.length', 8)
  //     .invoke('attr', 'class')
  //     .then(classList => expect(classList).contains('circle_default'))

  //   addFirstElem(1)

  //   cy.get(circle).then(el => {
  //     cy.get(el[0])
  //       .invoke('attr', 'class')
  //       .then(classList => expect(classList).contains('circle_default'))
  //     cy.get(el[0])
  //       .children()
  //       .should('have.text', '1')
  //     cy.get(el[0])
  //       .siblings('div').contains('head')
  //       .siblings('div').contains('tail')
  //   })

  //   addNextElem(2)

  //   cy.get(circle).then(el => {
  //     cy.get(el[0])
  //       .invoke('attr', 'class')
  //       .then(classList => expect(classList).contains('circle_default'))
  //     cy.get(el[0])
  //       .children()
  //       .should('have.text', '1')
  //     cy.get(el[0])
  //       .siblings('div').contains('head')
  //     cy.get(el[1])
  //       .invoke('attr', 'class')
  //       .then(classList => expect(classList).contains('circle_default'))
  //     cy.get(el[1])
  //       .children()
  //       .should('have.text', '2')
  //     cy.get(el[1])
  //       .siblings('div').contains('tail')
  //   })

  // })

  // it('Проверить корректность удаления элемента', () => {

  //   cy.clock()
  //   addFirstElem(1)
  //   cy.tick(time)
  //   addNextElem(2)

  //   cy.get('form').within(() => {
  //     cy.get('input').should('have.value', '')
  //     cy.get(addBtn).should('be.disabled')
  //     cy.get(delBtn).click()
  //   })
  //   cy.get(circle).then(el => {
  //     cy.get(el[0])
  //       .invoke('attr', 'class')
  //       .then(classList => expect(classList).contains('circle_changing'))
  //     cy.get(el[0])
  //       .children()
  //       .should('be.empty')

  //     cy.tick(time)

  //     cy.get(el[1])
  //       .invoke('attr', 'class')
  //       .then(classList => expect(classList).contains('circle_default'))
  //     cy.get(el[1])
  //       .children()
  //       .should('have.text', '2')
  //     cy.get(el[1])
  //       .siblings('div').contains('tail')
  //       .siblings('div').contains('head')
  //   })
  // })

  // it('Проверить корректность работы кнопки Очистить', () => {
  //   cy.clock()
  //   addFirstElem(1)

  //   cy.tick(time)

  //   addNextElem(2)

  //   cy.tick(time)

  //   cy.get('form').within(() => {
  //     cy.get('input').should('have.value', '')
  //     cy.get(addBtn).should('be.disabled')
  //     cy.get(clearBtn).click()
  //   })

  //   cy.tick(time)

  //   cy.get('form')
  //     .within(() => {
  //       cy.get('input').should('have.value', '')
  //       cy.get(addBtn).should('be.disabled')
  //       cy.get(delBtn).should('be.disabled')
  //       cy.get(clearBtn).should('be.disabled')
  //     })


})