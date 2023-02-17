import React, { useEffect, useState } from "react";
import { swap } from "../../constants/utils";
import { TWord } from "../../types/strinf";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";



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



  return (

    <SolutionLayout title="Строка">
      <div className={styles.input}>
        <Input maxLength={11} onChange={e => onChange(e)} type="text" />
        <Button text={'Развернуть'} onClick={onClick} />
      </div>
      {letters &&
        <ul className={styles.circle}>

          {letters?.map(({ letter, color, id }) => {
            return (
              <li>< Circle state={color} letter={letter} key={id} /></li>
            )
          })}
        </ul>
      }
    </SolutionLayout>

  );
};
