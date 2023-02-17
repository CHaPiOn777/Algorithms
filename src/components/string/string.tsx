import React, { useEffect, useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";

type TWord = Array<{
  letter: string;
  color: string;
  id: number;
}>

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isShownTimeout, setShownTimeout] = useState<boolean>(false);
  const [letters, setLetters] = useState<TWord>();


  const onClick = () => {
    setShownTimeout(true);
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  useEffect(() => {
    if (isShownTimeout) {
      const word = Array.from(inputValue).map((letter, index) => {
        return { letter: letter, color: 'default', id: index }
      });
      setLetters(word);
      let start = 0;
      let end = inputValue.length - 1;

      setInterval(() => {
        if (start <= end) {
          setLetters((oldLetters) => {
            let i = start;
            let j = end;
            const newLetters = [...oldLetters!];
            swap(newLetters, start, end);

            return newLetters
          })
          start++;
          end--;
        } else {
          setShownTimeout(false);
        }
      }, 1000)
    }


  }, [isShownTimeout])

  const colorSwap = (arr: TWord, firstIndex: number, secondIndex: number): void => {
    arr[secondIndex].color = arr[firstIndex].color = 'changing';
    if (secondIndex === firstIndex) {
      arr[secondIndex].color = 'modified';
    }
    if (secondIndex - firstIndex < 2) {
      arr[secondIndex].color = arr[firstIndex].color = 'modified';
    }
    if (firstIndex !== 0) {
      arr[secondIndex + 1].color = arr[firstIndex - 1].color = 'modified';
    }
  }
  const swap = (arr: TWord, firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
    colorSwap(arr, firstIndex, secondIndex)
  }

  return (
    <>
      <SolutionLayout title="Строка">
        <div className={styles.input}>
          <Input maxLength={11} onChange={e => onChange(e)} type="text" />
          <Button text={'Развернуть'} onClick={onClick} />
        </div>
        {letters &&
          <ul className={styles.circle}>

            {letters?.map(({ letter, color, id }, index) => {
              return (
                <li>< Circle state={color} letter={letter} key={id} /></li>
              )
            })}
          </ul>
        }
      </SolutionLayout>
    </>
  );
};
