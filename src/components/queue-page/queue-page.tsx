import React, { useEffect, useState } from "react";
import { delay } from "../../constants/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Queue } from "./class";


import styles from './queue-page.module.css';

const time = 500;

export const QueuePage: React.FC = () => {
  const queue = new Queue<string>(7);
  const [inputValue, setInputValue] = useState<string>('');
  const [stack, setStack] = useState<(string | undefined)[]>(queue.printQueue());
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [tail, setTail] = useState<number>(queue.getTail());

  
console.log(stack)
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value.trim());
  }

  const addItem = async () => {
    setInputValue('')
    queue.enqueue(inputValue);
    setStack([...queue.printQueue()]);
    setTail(queue.getTail());
    await delay(time)
    setCurrentIndex(currentIndex);

  }
  const delItem = async () => {
    // setStack([...queue.dequeue()]);

    await delay(time);

  }
  const clear = () => {
    setStack([]);
    setCurrentIndex(0)
  }
  // const peak = () => {
  //   return st.peack();
  // }

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
                // head={peak() === index ? "top" : ''}
                letter={item === null ? '' : item}
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
