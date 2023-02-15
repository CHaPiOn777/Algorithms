import React, { FormEvent, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { clearInterval } from "timers";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";


export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isShown, setShown] = useState<boolean>(false);
  let [i, setI] = useState<number>(0)

  const onClick = () => {
    setShown(true);
    reverceString(letters)
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const letters = inputValue.split('');

  const reverceString = (arr: string[]): string[] => {

    let start = 0;
    let end = arr.length - 1;

    while (start < end) {
      swap(arr, start, end);
      start++;
      end--;
    }


    return arr
  }
  // useEffect(() => {
  //   let o = setInterval(() => {
  //     setI(i++)
  //     console.log(i)
  //     if (i >= 15) {
  //       clearInterval(o)
  //     }

  //   }, 1000)
  //   console.log(i >= 15)

  // }, [])



  const swap = (arr: string[], firstIndex: number, secondIndex: number): void => {

    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
    setInterval(() => {
      setInputValue(arr.join(''))

    }, 1000)
  }

  return (
    <>
      <SolutionLayout title="Строка">
        <div className={styles.input}>
          <Input maxLength={11} onChange={e => onChange(e)} type="text" />
          <Button text={'Развернуть'} onClick={onClick} />
        </div>
        {isShown &&
          <ul className={styles.circle}>
            {letters.map((letter, index) => {
              return (
                <li>< Circle letter={letter} key={index} /></li>
              )
            })}
          </ul>
        }
      </SolutionLayout>
    </>
  );
};
