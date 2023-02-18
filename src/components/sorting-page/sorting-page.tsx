import React, { SetStateAction, useEffect, useState } from "react";
import { Direction } from "../../types/direction";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { AscendingIcon } from "../ui/icons/ascending-icon";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './sorting-page.module.css'

export const SortingPage: React.FC = () => {
  const [checked, setChecked] = useState<string>('1');
  const [arr, setArr] = useState<number[]>([]);
  const [change, setChange] = useState<boolean>(true)

  const chengeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.value)
  }
  const getRandomIndex = () => {
    return Math.floor((Math.random() * (18 - 3) + 3));
  }
  const getRandomInt = () => {
    return Math.floor((Math.random() * 101));
  }

    useEffect(() => {
      setArr([])
      const index = getRandomIndex()
      for (let i = 0; i < index; i++) {
        let randomNumber = getRandomInt();
        setArr((oldArr) => {
          const newArr = [...oldArr];
          newArr.push(randomNumber)
          return newArr
        })

      }
    }, [change])



  const randomArr = () => {
    setChange(!change)
  }



  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.input}>
        <RadioInput label={'Выбор'} checked={checked === '1' ? true : false} value={'1'} onChange={chengeCheckbox} />
        <RadioInput label={'Пузырек'} extraClass={styles.radio} checked={checked === '2' ? true : false} value={'2'} onChange={chengeCheckbox}/* onChange={e => onChange(e)} */ />
        <Button text='По возрастанию' sorting={Direction.Ascending} extraClass={`${styles.btnLeft} ${styles.btn}`}/* isLoader={isShownTimeout} *//*  onClick={onClick} disabled={validation}  */ />
        <Button text='По убыванию' extraClass={`${styles.btn}`} sorting={Direction.Ascending}/* isLoader={isShownTimeout} *//*  onClick={onClick} disabled={validation}  */ />
        <Button text='Новый массив' onClick={randomArr} extraClass={`${styles.btnNewArr} ${styles.btn}`}/* isLoader={isShownTimeout} *//*  onClick={onClick} disabled={validation}  */ />
      </div>
      {arr &&
        <ul className={styles.column}>
          {arr?.map((number, index) => {
            return (
              <li><Column index={number} key={index} /></li>
            )
          })}
        </ul>
      }
    </SolutionLayout>
  );
};
