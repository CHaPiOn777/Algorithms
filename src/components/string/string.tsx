import React, { FormEvent, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";


export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isShown, setShown] = useState<boolean>(false);

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
      setTimeout(() =>{
        swap(arr, start, end)
        
      start++;
      end--;}, 1000)
    }
    return arr
  }
 const swap = (arr: string[], firstIndex: number, secondIndex: number): void =>  {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
  setInputValue(arr.join(''))
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
