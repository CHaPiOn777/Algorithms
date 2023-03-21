import { Button } from "./button";
import TestRenderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';


describe('Тестирование компонента Button', () => {
    it ('Проверка кнопки с текстом', () => {
        const but = TestRenderer
        .create(<Button text={'Text'}/>)
        .toJSON()
        expect(but).toMatchSnapshot()
    })
    it ('Проверка кнопки без текста', () => {
        const but = TestRenderer
        .create(<Button />)
        .toJSON()
        expect(but).toMatchSnapshot()
    })
    it ('Проверка заблокированной кнопки', () => {
        const but = TestRenderer
        .create(<Button disabled/>)
        .toJSON()
        expect(but).toMatchSnapshot()
    })
    it ('Проверка кнопки с индикацией загрузки', () => {
        const but = TestRenderer
        .create(<Button isLoader/>)
        .toJSON()
        expect(but).toMatchSnapshot()
    })
    it ('Проверка вызова callback кнопки', () => {
        window.alert = jest.fn();
        render(<Button text={'CallBack'} onClick={() => {(alert('Вызов сработал успешно'))}} />)

        const but = screen.getByText('CallBack');
        fireEvent.click(but);

        expect(window.alert).toHaveBeenCalledWith('Вызов сработал успешно')
    })
})