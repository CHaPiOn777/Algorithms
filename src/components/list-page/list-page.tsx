import React, { useRef, useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './list-page.module.css';
import { delay } from "../../constants/utils";
import { LinkedList } from "./class";


const firstArr = ['0', '34', '8', '1'];
const time = 500;


export const ListPage: React.FC = () => {
  const [list] = useState(new LinkedList<string>(firstArr));
  const [listItems, setListItems] = useState<string[]>(firstArr);
  const [inputValue, setInputValue] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<number | string>('');
  const [headSmallCircle, setHeadSmallCircle] = useState<number>(NaN);
  const [tailSmallCircle, setTailSmallCircle] = useState<number>(NaN);
  const [headIndex, setHeadIndex] = useState<number>(list.getHeadIndex());
  const [tailIndex, setTailIndex] = useState<number>(list.getTailIndex());
  const [colorSmall, setColorSmall] = useState<number>(NaN);
  const [colorChanging, setColorChanging] = useState<number>(NaN);
  const [delItem, setDelItem] = useState<number>(NaN);
  const [loader, setLoader] = useState<number>(NaN);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  }
  const onChangeIndex = (e: React.FormEvent<HTMLInputElement>) => {
    setInputIndex(Number(e.currentTarget.value));
  }

  const addTail = async () => {

    setLoader(2);
    setTailIndex(list.getTailIndex());
    setHeadSmallCircle(tailIndex);
    list.addTail(inputValue);
    await delay(time);
    setInputValue('');
    setInputIndex('');
    setHeadSmallCircle(NaN);
    setListItems(list.print());
    setColorSmall(list.getTailIndex());
    setTailIndex(list.getTailIndex())
    await delay(time);
    setColorSmall(NaN);
    setLoader(NaN);
  }

  const addHead = async () => {
    setLoader(1);
    setHeadSmallCircle(headIndex);
    list.addHead(inputValue);
    await delay(time)
    setInputValue('');
    setInputIndex('');
    setTailIndex(list.getTailIndex());
    setHeadSmallCircle(NaN);
    setListItems(list.print());
    setColorSmall(list.getHeadIndex());
    await delay(time);
    setColorSmall(NaN);
    setLoader(NaN);
  }

  const addToIndex = async () => {
    setLoader(5);
    list.addToIndex(inputValue, +inputIndex);

    for (let i = 0; i <= inputIndex; i++) {
      await delay(time);
      setColorChanging(i)
      setHeadSmallCircle(i);
    }

    await delay(time);
    setInputValue('');
    setInputIndex('');
    setColorChanging(NaN)
    setColorSmall(+inputIndex);
    setTailIndex(list.getTailIndex());
    setHeadSmallCircle(NaN)
    setListItems(list.print());
    await delay(time);
    setColorSmall(NaN);
    setLoader(NaN);
  }

  const popToIndex = async () => {
    setLoader(6);
    list.popToIndex(+inputIndex);
    for (let i = 0; i <= +inputIndex + 1; i++) {
      setColorChanging(i)
      await delay(time);
    }
    setTailSmallCircle(+inputIndex);
    setDelItem(+inputIndex);
    setColorChanging(+inputIndex);
    await delay(time);
    setInputValue('');
    setInputIndex('');
    setColorChanging(NaN);
    setTailSmallCircle(NaN)
    setColorSmall(NaN);
    setListItems(list.print());
    setTailIndex(list.getTailIndex());
    setDelItem(NaN);
    setLoader(NaN);
  }

  const popTail = async () => {

    setLoader(4);
    setTailIndex(list.getTailIndex());
    setTailSmallCircle(tailIndex);
    list.popTail();
    await delay(time);
    setInputValue('');
    setInputIndex('');
    setTailIndex(list.getTailIndex());
    setTailSmallCircle(NaN);
    setListItems(list.print());
    setLoader(NaN);
  }
  const popHead = async () => {

    setLoader(3);
    setHeadIndex(list.getHeadIndex());
    setTailSmallCircle(headIndex);
    list.popHead();
    await delay(time);
    setInputValue('');
    setInputIndex('');
    setHeadIndex(list.getHeadIndex());
    setTailSmallCircle(NaN);
    setListItems(list.print());
    setTailIndex(list.getTailIndex());
    setLoader(NaN);
  }

  const validationIndex = ((inputIndex! > list.getSize()) || (inputIndex! < 0)) ? true : false;
  const validationInputIndex = inputIndex ? false : true;
  const validationInputValue = inputValue ? false : true;
  const validationLoader = (index: number) => {
    if (loader && loader !== index) {
      return true
    } else {
      return false
    }
  }

  return (
    <SolutionLayout title="Связный список">
      <form data-cy="form" onSubmit={e => e.preventDefault()} className={styles.form}>
        <Input
          extraClass={styles.input}
          maxLength={4}
          isLimitText={true}
          placeholder={'Введите значение'}
          onChange={e => onChange(e)}
          value={inputValue}
        />
        <Button
          data-cy="addHead"
          extraClass={styles.btn}
          text={'Добавить в head'}
          isLoader={loader === 1}
          onClick={addHead}
          disabled={validationInputValue || validationLoader(1)}
        />
        <Button
          data-cy="addTail"
          extraClass={styles.btn}
          text={'Добавить в tail'}
          isLoader={loader === 2}
          onClick={addTail}
          disabled={validationInputValue || validationLoader(2)}
        />
        <Button
          data-cy="delHead"
          extraClass={styles.btn}
          text={'Удалить из head'}
          isLoader={loader === 3}
          onClick={popHead}
          disabled={validationLoader(3)}
        />
        <Button
          data-cy="delTail"
          extraClass={styles.btn}
          text={'Удалить из tail'}
          isLoader={loader === 4}
          onClick={popTail}
          disabled={validationLoader(4)}
        />
      </form>
      <form data-cy="formIndex" onChange={e => e.preventDefault()} className={`${styles.form} ${styles.formIndex}`}>
        <Input
          data-cy="inputIndex"
          max={list.getSize()}
          type='number'
          isLimitText={true} extraClass={styles.input}
          placeholder={'Введите индекс'}
          onChange={e => onChangeIndex(e)}
          value={inputIndex}
        />
        <Button
          data-cy="addIndex"
          extraClass={styles.btnIndex}
          text={'Добавить по индексу'}
          onClick={addToIndex}
          isLoader={loader === 5}
          disabled={validationIndex || validationInputIndex || validationInputValue || validationLoader(5)}
        />
        <Button
          data-cy="delIndex"
          extraClass={styles.btnIndex}
          text={'Удалить по индексу'}
          onClick={popToIndex}
          isLoader={loader === 6}
          disabled={validationIndex || validationInputIndex || validationLoader(6)}
        />

      </form>
      {listItems &&
        <ul className={styles.circle}>

          {listItems?.map((item, index) => {
            return (
              <li className={styles.circleItems} key={index}>
                < Circle
                  head={
                    headSmallCircle === index ?
                      <Circle state={'changing'} letter={inputValue} isSmall />
                      : headIndex === index ? 'head' : ''
                  }
                  letter={delItem === index ? '' : item}
                  key={index}
                  index={index}
                  state={colorChanging && colorChanging > index ? 'changing' : colorSmall === index ? 'modified' : 'default'}
                  tail={tailSmallCircle === index ?
                    <Circle state={'changing'} letter={item} isSmall />
                    : tailIndex === index ? 'tail' : ''}
                />
                {
                  (index < listItems.length - 1) &&
                  < ArrowIcon />
                }
              </li>
            )
          })}
        </ul>
      }

    </SolutionLayout>
  );
};
