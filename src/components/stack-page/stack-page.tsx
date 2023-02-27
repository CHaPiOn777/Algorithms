import React, { useState } from "react";
import { delay } from "../../constants/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Stack } from "./class";
import styles from './stack-page.module.css';

const time = 500;

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [stack, setStack] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const st = new Stack<string>(stack);


  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  }

  const addItem = async () => {
    setInputValue('')
    setStack([...st.push(inputValue)]);
    await delay(time)
    setCurrentIndex(currentIndex + 1);

  }
  const delItem = async () => {
    setStack([...st.pop()]);
    setCurrentIndex(st.getSize() - 1)
    await delay(time);
    setCurrentIndex(st.getSize())
  }
  const clear = () => {
    setStack([]);
    setCurrentIndex(0)
  }
  const peak = () => {
    return st.peack();
  }

  return (
    <SolutionLayout title="Стек">
      <form className={styles.input} onClick={(e) => e.preventDefault()}>
        <Input
          isLimitText={true}
          maxLength={4}
          onChange={e => onChange(e)}
          type="text" value={inputValue}
        />
        <Button
          text='Добавить'
          onClick={addItem}
          disabled={inputValue ? false : true}
        />
        <Button
          text='Удалить'
          onClick={delItem}
          disabled={stack.length ? false : true}
        />
        <Button
          text='Очистить'
          onClick={clear}
          extraClass={`${styles.btnNewArr} ${styles.btn}`}
          disabled={stack.length ? false : true}
        />
      </form>
      {stack &&
        <ul className={styles.circle}>

          {stack?.map((item, index: number) => {
            return (
              <li>< Circle
                head={peak() === index ? "top" : ''}
                letter={item}
                key={index}
                index={index}
                state={index === currentIndex ? 'changing' : 'default'} />
              </li>
            )
          })}
        </ul>
      }
    </SolutionLayout>
  );
};
