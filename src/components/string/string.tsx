import React, { useState } from "react";
import { swap } from "../../constants/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { delay } from "../../constants/utils";
import styles from "./string.module.css";

const time = 1000;

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isShownTimeout, setShownTimeout] = useState<boolean>(false);
  const [letters, setLetters] = useState<string[]>([]);
  const [colorIndexStart, setColorIndexStart] = useState<number>(NaN);
  const [colorIndexEnd, setColorIndexEnd] = useState<number>(NaN);
  const [colorIndexModifiedStart, setColorIndexModifiedStart] = useState<number>(NaN);
  const [colorIndexModifiedEnd, setColorIndexModifiedEnd] = useState<number>(NaN);
  const [loader, seetLoader] = useState<boolean>(false)


  const onClick = async () => {
    seetLoader(true)
    setLetters(inputValue.split(''));
    let start = 0;
    let end = inputValue.length - 1;

    while (start <= end) {
      setColorIndexStart(start);
      setColorIndexEnd(end);
      await delay(time)
      setLetters((oldLetters) => {
        const newLetters = [...oldLetters!];
        swap(newLetters, start, end);
        return newLetters
      });
      setColorIndexModifiedStart(start);
      setColorIndexModifiedEnd(end);
      start++;
      end--;
    }
    setColorIndexStart(start);
    setColorIndexEnd(end);
    seetLoader(false);
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  return (

    <SolutionLayout title="Строка">
      <div className={styles.input}>
        <Input value={inputValue} isLimitText={true} maxLength={11} onChange={e => onChange(e)} type="text" />
        <Button text={'Развернуть'} onClick={onClick} isLoader={loader} disabled={inputValue ? false : true} />

      </div>
      {letters &&
        <ul className={styles.circle}>

          {letters?.map((letter, index) => {
            console.log(colorIndexEnd, colorIndexStart, index)
            return (
              <li key={index} >
                <Circle
                  letter={letter}
                  state=
                  {
                    colorIndexEnd <= colorIndexStart ? 'modified' :
                      colorIndexStart === index || colorIndexEnd === index ? 'changing' :
                        colorIndexModifiedStart >= index || colorIndexModifiedEnd <= index ? 'modified' :
                          'default'
                  }
                />
              </li>
            )
          })}
        </ul>
      }
    </SolutionLayout>

  );
};
