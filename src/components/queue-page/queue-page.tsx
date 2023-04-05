import React, { useState } from "react";
import { delay } from "../../constants/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Queue } from "./class";


import styles from './queue-page.module.css';

const time = 500;

export const QueuePage: React.FC = () => {
  const size = 8;
  const [queue] = useState(new Queue<string>(size))
  const [inputValue, setInputValue] = useState<string>('');
  const [stack, setStack] = useState<(string | undefined)[]>(queue.printQueue());
  const [currentIndex, setCurrentIndex] = useState<number>(NaN);
  const [tail, setTail] = useState<number>(NaN);
  const [head, setHead] = useState<number | null>(null);
  const [loader, setLoader] = useState<number>(0);
  console.log(head === null)

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  }

  const addItem = async () => {
    setLoader(1);
    setCurrentIndex(queue.getTail());
    setInputValue('');
    await delay(time);
    queue.enqueue(inputValue);
    setStack([...queue.printQueue()]);
    setHead(queue.getHead());
    setTail(queue.getTail());
    setCurrentIndex(tail);
    await delay(time)
    setCurrentIndex(NaN);
    setLoader(0);
  }
  const delItem = async () => {
    setLoader(2);
    setCurrentIndex(queue.getHead());
    await delay(time);
    queue.dequeue();
    setStack([...queue.printQueue()]);
    setHead(queue.getHead())
    setCurrentIndex(NaN);
    setLoader(0);
  }
  const clear = async () => {
    queue.reset();
    setStack([...queue.printQueue()]);
    setHead(null);
    setTail(queue.getTail());
    await delay(time)
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
      <form className={styles.input} onSubmit={(e) => e.preventDefault()}>
        <Input
          isLimitText={true}
          maxLength={4}
          onChange={e => onChange(e)}
          type="text"
          value={inputValue}
        />
        <Button
          text='Добавить'
          onClick={() => addItem()}
          isLoader={loader === 1}
          disabled={!inputValue || validationLoader(1)}
        />
        <Button
          text='Удалить'
          onClick={delItem}
          isLoader={loader === 2}
          disabled={head === null || head! >= tail ||  validationLoader(2)}
        />
        <Button
          text='Очистить'
          onClick={clear}
          extraClass={`${styles.btnNewArr} ${styles.btn}`}
          disabled={head === null || validationLoader(3)}
        />
      </form>
      {stack &&
        <ul className={styles.circle}>
          {stack?.map((item, index) => {
            return (
              <li key={index}>
                <Circle
                  tail={tail <= head! ? '' : tail - 1 === index ? 'tail' : ''}
                  head={head === null ? '' : head === index ? 'head' : ''}
                  letter={!item ? '' : item}
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
