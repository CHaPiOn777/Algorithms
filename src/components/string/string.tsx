import React, { FormEvent, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { clearInterval } from "timers";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";

type TWord = Array<{
  letter: string;
  color: string;
}>

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isShown, setShown] = useState<boolean>(false);
  const [isShownTimeout, setShownTimeout] = useState<boolean>(false);
  const [letters, setLetters] = useState<TWord>();


  const onClick = () => {

    setShownTimeout(true);
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isShownTimeout) {
      const word = Array.from(inputValue).map((letter) => {
        return { letter: letter, color: 'default' }
      });
      setLetters(word);
      let start = 0;
      let end = inputValue.length - 1;
      
      interval = setInterval(() => {

        if (start < end) {
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


  const swap = (arr: TWord, firstIndex: number, secondIndex: number): void => {
    console.log(secondIndex, firstIndex)
    if (firstIndex > 0) {
      arr[secondIndex].color = arr[firstIndex].color = 'changing'
      arr[secondIndex +1].color = arr[firstIndex - 1].color = 'modified'
      if (secondIndex - firstIndex === 1) {
        arr[secondIndex].color = arr[firstIndex].color = 'changing'
        arr[secondIndex].color = arr[firstIndex].color = 'modified'
      }
    } else {
      arr[secondIndex].color = arr[firstIndex].color = 'changing'
    }
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
   
    
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

            {letters?.map(({ letter, color }, index) => {

              return (

                <li>< Circle state={color} letter={letter} key={index} /></li>
              )
            })}
          </ul>
        }
      </SolutionLayout>
    </>
  );
};
