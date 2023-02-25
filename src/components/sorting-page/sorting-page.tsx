import React, { useEffect, useState } from "react";
import { swap } from "../../constants/utils";
import { Direction } from "../../types/direction"
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './sorting-page.module.css';

export type TNumber = Array<{
  number: number;
  color: string
}>

export const SortingPage: React.FC = () => {
  const [checked, setChecked] = useState<string>('1');
  const [arrNuumber, setArr] = useState<TNumber>();
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
        const newArr = [...oldArr!];
        newArr.push({ number: randomNumber, color: 'default' })
        return newArr
      })

    }
  }, [change])

  const bubbleSort = (arr: TNumber, ascending: boolean) => {
    let i = 0;
    let j = 0;
    let interval: NodeJS.Timeout;
    const end = arr.length - 1;

    interval = setInterval(() => {
      if (i < end) {
        if (j < end - i) {
          if (ascending) {
            if (arr[j].number > arr[j + 1].number) {
              swap(arr, j, j + 1);
              setArr([...arr]);
            }
          } else {
            if (arr[j].number < arr[j + 1].number) {
              swap(arr, j, j + 1)
              setArr([...arr])
            }
          }

          arr[j].color = arr[j + 1].color = 'changing';
          if (j !== 0) {
            arr[j - 1].color = 'default'
          }
          if (j === end - i - 1) {
            arr[j].color = 'default'
            arr[j + 1].color = 'modified'
          }
          setArr([...arr]);

          j++
        } else {
          j = 0
          i++
        }
      } else {
        arr[0].color = 'modified';
        setArr([...arr]);
        clearInterval(interval)
      }
    }, 200)
  }

  const selectionSort = (arr: TNumber, ascending: boolean) => {
    let i = 0;
    let j = 1;
    let interval: NodeJS.Timeout;
    const end = arr.length;

    interval = setInterval(() => {
      if (i < end) {
        if (j < end) {
          if (ascending) {
            if (arr[j].number < arr[i].number) {
              swap(arr, i, j);
              setArr([...arr!])
            }
          } else {
            if (arr[j].number > arr[i].number) {
              swap(arr, i, j)
              setArr([...arr!])
            }
          }
          arr[j].color = arr[i].color ='changing';
          if (j - i > 1) {
            arr[j - 1].color = 'default'
          }
          setArr([...arr]);
          j++
        } else {
          arr[end - 1].color = 'default'
          arr[i].color ='modified';
          setArr([...arr]);
          i++;
          j = i + 1;
        }
      } else {
        clearInterval(interval)
      }
    }, 300)
  }

  const choiceSort = (ascending: boolean) => {
    if (checked === '2') {
      return bubbleSort(arrNuumber!, ascending)
    } else {
      return selectionSort(arrNuumber!, ascending)
    }
  }

  const randomArr = () => {
    setChange(!change)
  }


  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.input}>
        <RadioInput label={'Выбор'} checked={checked === '1' ? true : false} value={'1'} onChange={chengeCheckbox} />
        <RadioInput label={'Пузырек'} extraClass={styles.radio} checked={checked === '2' ? true : false} value={'2'} onChange={chengeCheckbox}/* onChange={e => onChange(e)} */ />
        <Button text='По возрастанию' onClick={() => choiceSort(true)} sorting={Direction.Ascending} extraClass={`${styles.btnLeft} ${styles.btn}`}/* isLoader={isShownTimeout} *//*  onClick={onClick} disabled={validation}  */ />
        <Button text='По убыванию' onClick={() => choiceSort(false)} extraClass={`${styles.btn}`} sorting={Direction.Descending}/* isLoader={isShownTimeout} *//*  onClick={onClick} disabled={validation}  */ />
        <Button text='Новый массив' onClick={randomArr} extraClass={`${styles.btnNewArr} ${styles.btn}`}/* isLoader={isShownTimeout} *//*  onClick={onClick} disabled={validation}  */ />
      </div>
      {arrNuumber &&
        <ul className={styles.column}>
          {arrNuumber?.map(({ number, color }, index) => {
            return (
              <li><Column state={color} index={number} key={index} /></li>
            )
          })}
        </ul>
      }
    </SolutionLayout>
  );
};
