import React, { useState } from "react";
import { delay } from "../../constants/utils";
import { timeString } from "../string/string";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Stack } from "./class";
import styles from './stack-page.module.css';

const time = 500;

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [stack, setStack] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loader, setLoader] = useState<number>(0);
  const st = new Stack<string>(stack);


  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  }

  const addItem = async () => {
    setLoader(1);
    setInputValue('');
    setStack([...st.push(inputValue)]);
    await delay(time);
    setCurrentIndex(currentIndex + 1);
    setLoader(0);
  }
  const delItem = async () => {
    setLoader(2);
    setCurrentIndex(st.getSize() - 1);
    setInputValue('')
    await delay(time);
    setStack([...st.pop()]);
    setCurrentIndex(st.getSize());
    setLoader(0);
  }
  const clear = () => {
    setStack([]);
    setCurrentIndex(0);
  }
  const peak = () => {
    return st.peack();
  }
  const validationLoader = (index: number) => {
    if (loader && loader !== index) {
      return true
    } else {
      return false
    }
  }
  return (
    <SolutionLayout title="Стек">
      <form className={styles.input} onSubmit={e => e.preventDefault()}>
        <Input
          isLimitText={true}
          maxLength={4}
          onChange={e => onChange(e)}
          type="text"
          value={inputValue}
        />
        <Button
          data-cy="add"
          text='Добавить'
          onClick={addItem}
          isLoader={loader === 1}
          disabled={!inputValue || validationLoader(1)}
        />
        <Button
          data-cy="del"
          text='Удалить'
          onClick={delItem}
          isLoader={loader === 2}
          disabled={!stack.length || validationLoader(2)}
        />
        <Button
          data-cy="clear"
          text='Очистить'
          onClick={clear}
          extraClass={`${styles.btnNewArr} ${styles.btn}`}
          disabled={!stack.length || validationLoader(3)}
        />
      </form>
      {stack &&
        <ul className={styles.circle}>

          {stack?.map((item, index: number) => {
            return (
              <li key={index}>
                <Circle
                  head={peak() === index ? "top" : ''}
                  letter={item}
                  key={index}
                  index={index}
                  state={index === currentIndex ? 'changing' : 'default'}
                />
              </li>
            )
          })}
        </ul>
      }
    </SolutionLayout>
  );
};
