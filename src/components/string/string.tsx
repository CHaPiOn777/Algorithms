import React, { FormEvent, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";


export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isShown, setShown] = useState<boolean>(false);
  const refq = useRef<HTMLInputElement>(null);

  const onClick = () => {
    const a = refq;
    console.log(a)
    setShown(true)
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const letters = inputValue.split('');

  useEffect(() => {
    const interval = setInterval(() => {
      letters.sort();
      setInputValue(letters.join(''))
      console.log(letters)
    }, 1000)

    return () => clearInterval(interval)
  }, [])


  return (
    <>
      <SolutionLayout title="Строка">
        <div className={styles.input}>
          <Input maxLength={11} ref={refq} onChange={onChange} type="text" />
          <Button text={'Развернуть'} onClick={onClick} />
        </div>
        {isShown &&
          <ul className={styles.circle}>
            {letters.map((letter, index) => {
              return (
                <li>< Circle letter={letter} key={index}/></li>
              )
            })}
          </ul>
        }
      </SolutionLayout>
    </>
  );
};
