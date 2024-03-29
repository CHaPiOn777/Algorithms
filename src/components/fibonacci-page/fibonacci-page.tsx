import React, { useEffect, useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './fibonacci-page.module.css'

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<number | string>('');
  const [isShownTimeout, setShownTimeout] = useState<boolean>(false);
  const [fiboN, setFiboN] = useState<number[]>([]);


  const onClick = () => {
    setShownTimeout(true);
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(Number(e.currentTarget.value))
  }

  const fib = (i: number, memo: Record<number, number> = {}): number => {
    if (i in memo) {
      return memo[i]
    }
    if (i <= 2) {
      return 1
    }
    memo[i] = fib(i - 1, memo) + fib(i - 2, memo);
    return memo[i]
  }

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isShownTimeout) {
      let i = 1;
      setFiboN([]);

      interval = setInterval(() => {
        if (i <= +inputValue + 1) {
          setFiboN((oldFibo) => {
            const newFibo = [...oldFibo!];
            newFibo.push(fib(i))
            return newFibo
          })
          i++
        } else {
          setShownTimeout(false);
          setInputValue('');
        }
      }, 500)
    }

    return (() => {
      if (interval) clearInterval(interval);
      
    })

  }, [isShownTimeout]);

  const validation = ((inputValue > 19) || (inputValue < 0) || !inputValue) ? true : false;

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.input} onSubmit={e => e.preventDefault()}>
        <Input max={19} isLimitText={true} type='number' onChange={e => onChange(e)} value={inputValue} />
        <Button text={'Рассчитать'} isLoader={isShownTimeout} onClick={onClick} disabled={validation} />
      </form>
      {fiboN &&
        <ul className={styles.circle}>
          {fiboN?.map((number, index) => {
            return (
              <li key={index}>
                <Circle index={index} letter={number} />
              </li>
            )
          })}
        </ul>
      }
    </SolutionLayout>
  );
};
