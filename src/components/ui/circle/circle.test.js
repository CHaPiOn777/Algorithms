import { Circle } from "./circle";
import TestRenderer from 'react-test-renderer';

describe('Тестирование компонента Circle', () => {
    it('Проверка circle без буквы', () => {
        const circle = TestRenderer
        .create(<Circle />)
        .toJSON()

        expect(circle).toMatchSnapshot()
    })
    it('Проверка circle с буквами', () => {
        const circle = TestRenderer
        .create(<Circle letter='letter' />)
        .toJSON()

        expect(circle).toMatchSnapshot()
    })
    it('Проверка circle с head', () => {
        const circle = TestRenderer
        .create(<Circle head='letter' />)
        .toJSON()

        expect(circle).toMatchSnapshot()
    })
    it('Проверка circle с react-элементом в head', () => {
        const circle = TestRenderer
        .create(<Circle head={<Circle />} />)
        .toJSON()

        expect(circle).toMatchSnapshot()
    })
    it('Проверка circle с tail', () => {
        const circle = TestRenderer
        .create(<Circle tail='letter' />)
        .toJSON()

        expect(circle).toMatchSnapshot()
    })
    it('Проверка circle с react-элементом в tail', () => {
        const circle = TestRenderer
        .create(<Circle tail={<Circle />} />)
        .toJSON()

        expect(circle).toMatchSnapshot()
    })
    it('Проверка circle с index', () => {
        const circle = TestRenderer
        .create(<Circle index={1} />)
        .toJSON()

        expect(circle).toMatchSnapshot()
    })
    it('Проверка circle с isSmall', () => {
        const circle = TestRenderer
        .create(<Circle isSmall />)
        .toJSON()

        expect(circle).toMatchSnapshot()
    })
    it('Проверка circle в состоянии default', () => {
        const circle = TestRenderer
        .create(<Circle state={'default'} />)
        .toJSON()

        expect(circle).toMatchSnapshot()
    })
    it('Проверка circle в состоянии changing', () => {
        const circle = TestRenderer
        .create(<Circle state={'changing'} />)
        .toJSON()

        expect(circle).toMatchSnapshot()
    })
    it('Проверка circle в состоянии modified', () => {
        const circle = TestRenderer
        .create(<Circle state={'modified'} />)
        .toJSON()

        expect(circle).toMatchSnapshot()
    })
})