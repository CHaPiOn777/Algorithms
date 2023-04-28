describe('Сервер доступен', function () {
	beforeEach(() => {
		cy.visit('/');
	})
	it('Доступен по адресу localhost:3000/recursion', function () {
		cy.get('a[href*="/recursion"]').click()
		cy.contains('Строка')
	});

	it('Доступен по адресу localhost:3000/fibonacci', function () {
		cy.get('a[href*="/fibonacci"]').click()
		cy.contains('Последовательность Фибоначчи')
	});

	it('Доступен по адресу localhost:3000/sorting', function () {
		cy.get('a[href*="/sorting"]').click()
		cy.contains('Сортировка массива')
	});

	it('Доступен по адресу localhost:3000/stack', function () {
		cy.get('a[href*="/stack"]').click()
		cy.contains('Стек')
	});

	it('Доступен по адресу localhost:3000/queue', function () {
		cy.get('a[href*="/queue"]').click()
		cy.contains('Очередь')
	});
	
	it('Доступен по адресу localhost:3000/list', function () {
		cy.get('a[href*="/list"]').click()
		cy.contains('Связный список')
	});
}); 