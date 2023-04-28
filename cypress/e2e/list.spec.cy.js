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
    cy.tick(time)
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

  it('Если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.get(form)
      .within(() => {
        cy.get('input').should('have.value', '')
        cy.get(addHead).should('be.disabled')
        cy.get(addTail).should('be.disabled')
        cy.get(delHead).should('be.not.disabled')
        cy.get(delTail).should('be.not.disabled')

      })
    cy.get(formIndex)
      .within(() => {
        cy.get(inputIndex).should('have.value', '')
        cy.get(addIndex).should('be.disabled')
        cy.get(delIndex).should('be.disabled')

      })
  })
  it('Проверить корректность начальной отрисовки', function () {
    cy.get(circle).should('have.length', 4)
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_default'))

    cy.get(circle).then((elem) => {
      cy.get(elem[0])
        .children().should('have.text', '0')

      cy.get(elem[1])
        .children().should('have.text', '34')

      cy.get(elem[2])
        .children().should('have.text', '8')

      cy.get(elem[3])
        .children().should('have.text', '1')
    })

    cy.get(circle).should('have.length', 4)
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_default'))
  })

  it('Проверить корректность добавления в head', function () {
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
  it('Проверить корректность добавления в tail', function () {
    cy.clock()
    addTailElem('2')
    cy.get(circle).then((el) => {
      
      cy.get(el[0])
        .children().should('have.text', '0')
      cy.get(el[0])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_default'))

      cy.get(el[1])
        .children().should('have.text', '34')
      cy.get(el[1])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_default'))

      cy.get(el[2])
        .children().should('have.text', '8')
      cy.get(el[2])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_default'))

      cy.get(el[3])
        .children().should('have.text', '1')
      cy.get(el[3])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_default'))
        cy.get(el[4])
        .children().should('have.text', '2')
      cy.get(el[4])
        .invoke('attr', 'class')
        .then(classList => expect(classList).contains('circle_modified'))
        

    })

    cy.tick(time)

    cy.get(circle)
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_default'))
    
  })

  it('Проверить корректность добавления элемента по индексу', function () {
		addIndexElem(2, 2)
		cy.tick(time)
		cy.wait(time)
		cy.get(circle).then((elem) => {
			cy.get(elem[0])
				.children().should('have.text', '0')
			cy.get(elem[0])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains('circle_changing'))

			cy.get(elem[1])
				.children().should('have.text', '34')
			cy.get(elem[1])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains('circle_changing'))

			cy.get(elem[2])
				.children().should('have.text', '2')
			cy.get(elem[2])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains('circle_changing'))

			cy.get(elem[3])
				.children().should('have.text', '8')
			cy.get(elem[3])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains('circle_default'))

			cy.get(elem[4])
				.children().should('have.text', '1')
			cy.get(elem[4])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains('circle_default'))
		})

		cy.tick(time)

		cy.get(circle).then((elem) => {
			cy.get(elem[0])
				.children().should('have.text', '0')
			cy.get(elem[0])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains('circle_default'))

			cy.get(elem[1])
				.children().should('have.text', '34')
			cy.get(elem[1])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains('circle_default'))

			cy.get(elem[2])
				.children().should('have.text', '2')
			cy.get(elem[2])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains('circle_modified'))

			cy.get(elem[3])
				.children().should('have.text', '8')
			cy.get(elem[3])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains('circle_default'))

			cy.get(elem[4])
				.children().should('have.text', '1')
			cy.get(elem[4])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains('circle_default'))
		})

		cy.tick(time)

		cy.get(circle).should('have.length', 5)
			.invoke('attr', 'class')
			.then(classList => expect(classList).contains('circle_default'))
	})
  it('Проверить корректность удаление элемента из head', function () {
		cy.clock()
		cy.get(form)
			.within(() => {
				cy.get(addTail).should('be.disabled')
				cy.get(addHead).should('be.disabled')
				cy.get(delTail).should('be.not.disabled')
				cy.get(delHead).should('be.not.disabled')
			})
		cy.get(formIndex)
			.within(() => {
				cy.get(addIndex).should('be.disabled')
			})
		cy.tick(time)
		cy.get(form)
			.within(() => {
				cy.get(delHead).click()
				cy.get(addHead).should('be.disabled')
				cy.get(addTail).should('be.disabled')
				cy.get(delTail).should('be.disabled')
			})
		cy.get(formIndex)
			.within(() => {
				cy.get(addIndex).should('be.disabled')
				cy.get(delIndex).should('be.disabled')
			})

		cy.tick(time)
		cy.wait(time)

		cy.get(circle).then((elem) => {
			cy.get(elem[0])
				.children().should('have.text', '34')

			cy.get(elem[1])
				.children().should('have.text', '8')

			cy.get(elem[2])
				.children().should('have.text', '1')
		})

		cy.get(form)
			.within(() => {
				cy.get(addTail).should('be.disabled')
				cy.get(addHead).should('be.disabled')
				cy.get(delTail).should('be.not.disabled')
				cy.get(delHead).should('be.not.disabled')
			})
		cy.get(formIndex)
			.within(() => {
				cy.get(addIndex).should('be.disabled')
			})
	})

	it('Проверить корректность удаление элемента из tail', function () {
		cy.clock()
		cy.get(form)
			.within(() => {
				cy.get(addTail).should('be.disabled')
				cy.get(addHead).should('be.disabled')
				cy.get(delTail).should('be.not.disabled')
				cy.get(delHead).should('be.not.disabled')
			})
		cy.get(formIndex)
			.within(() => {
				cy.get(addIndex).should('be.disabled')
			})
		cy.tick(time)
		cy.get(form)
			.within(() => {
				cy.get(delTail).click()
				cy.get(delHead).should('be.disabled')
				cy.get(addHead).should('be.disabled')
				cy.get(addTail).should('be.disabled')
			})
		cy.get(formIndex)
			.within(() => {
				cy.get(addIndex).should('be.disabled')
				cy.get(delIndex).should('be.disabled')
			})

		cy.tick(time)
		cy.wait(time)

		cy.get(circle).then((elem) => {
			cy.get(elem[0])
				.children().should('have.text', '0')

			cy.get(elem[1])
				.children().should('have.text', '34')

			cy.get(elem[2])
				.children().should('have.text', '8')
		})

		cy.get(form)
			.within(() => {
				cy.get(addTail).should('be.disabled')
				cy.get(addHead).should('be.disabled')
				cy.get(delTail).should('be.not.disabled')
				cy.get(delHead).should('be.not.disabled')
			})
		cy.get(formIndex)
			.within(() => {
				cy.get(addIndex).should('be.disabled')
			})
	})

	it('Проверить корректность удаление элемента по индексу', function () {
		cy.clock()
		cy.get(form)
			.within(() => {
				cy.get(addTail).should('be.disabled')
				cy.get(addHead).should('be.disabled')
				cy.get(delTail).should('be.not.disabled')
				cy.get(delHead).should('be.not.disabled')
			})
		cy.get(formIndex)
			.within(() => {
				cy.get(inputIndex).type('2')
				cy.get(addIndex).should('be.disabled')
				cy.get(delIndex).should('be.not.disabled')
			})
		cy.tick(time)

		cy.get(formIndex)
			.within(() => {
				cy.get(delIndex).click()
			})
		cy.get(form)
			.within(() => {
				cy.get(delTail).should('be.disabled')
				cy.get(delHead).should('be.disabled')
				cy.get(addHead).should('be.disabled')
				cy.get(addTail).should('be.disabled')
			})

		cy.tick(time)
		cy.wait(time)

		cy.get(circle).then((elem) => {
			cy.get(elem[0])
				.children().should('have.text', '0')

			cy.get(elem[1])
				.children().should('have.text', '34')

			cy.get(elem[2])
				.children().should('have.text', '8')

			cy.get(elem[3])
				.children().should('have.text', '1')
		})

		cy.tick(time)
		cy.wait(time)

		cy.get(circle).then((elem) => {
			cy.get(elem[0])
				.children().should('have.text', '0')

			cy.get(elem[1])
				.children().should('have.text', '34')

			cy.get(elem[2])
				.children().should('have.text', '8')

			cy.get(elem[3])
				.children().should('have.text', '1')
		})

		cy.tick(time)
		cy.wait(time)

		cy.get(circle).then((elem) => {
			cy.get(elem[0])
				.children().should('have.text', '0')

			cy.get(elem[1])
				.children().should('have.text', '34')
        cy.tick(time)
        cy.wait(time)
			cy.get(elem[2])
				.children().should('have.text', '')

			cy.get(elem[3])
				.children().should('have.text', '1')
		})

		cy.tick(time)
		cy.wait(time)

		cy.get(circle).then((elem) => {
			cy.get(elem[0])
				.children().should('have.text', '0')

			cy.get(elem[1])
				.children().should('have.text', '34')

			cy.get(elem[2])
				.children().should('have.text', '1')

		})

		cy.tick(time)
		cy.wait(time)

		cy.get(circle).then((elem) => {
			cy.get(elem[0])
				.children().should('have.text', '0')

			cy.get(elem[1])
				.children().should('have.text', '34')

			cy.get(elem[2])
				.children().should('have.text', '1')
		})

		cy.get(form)
			.within(() => {
				cy.get(addTail).should('be.disabled')
				cy.get(addHead).should('be.disabled')
				cy.get(delTail).should('be.not.disabled')
				cy.get(delHead).should('be.not.disabled')
			})
		cy.get(formIndex)
			.within(() => {
				cy.get(addIndex).should('be.disabled')
				cy.get(delIndex).should('be.disabled')
			})

		cy.get(circle).should('have.length', 3)
			.invoke('attr', 'class')
			.then(classList => expect(classList).contains('circle_default'))
	})

})