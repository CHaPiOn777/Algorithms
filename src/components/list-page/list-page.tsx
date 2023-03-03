import React, { useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './list-page.module.css';
import { delay } from "../../constants/utils";

export class Node<T> {
  value: T
  next: Node<T> | null;
  constructor(value: T, next?: Node<T>) {
    this.value = value;
    this.next = (next === undefined ? null : next)
  }
}

interface ILinkedList<T> {
  addTail: (el: T) => void;
  getSize: () => number;
  print?: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  private headIndex: number;
  private tailIndex: number;
  constructor(values: T[]) {
    this.head = null;
    this.size = 0;
    this.headIndex = 0;
    this.tailIndex = 0;
    if (values.length) {
      this.appendArray(values)
    }
  }

  appendArray(values: T[]) {
    values.forEach(value => this.addTail(value))
  }

  addHead(element: T) {

    const node = new Node(element);
    let current;
    current = this.head
    this.head = node;
    this.head!.next = current;
    this.tailIndex++;
    this.size++;
    return this
  }

  addTail(element: T) {

    const node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
      return this;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
    this.tailIndex++;

    return this;
  }
  addToIndex(element: T, index: number) {
    const node = new Node(element);
    let current;
    let prev;
    current = this.head;
    prev = current;
    if (!this.head) {
      this.head = node;
      this.tailIndex++;
      this.size++
      return this
    }

    if (index === 0) {
      this.head = node;
      this.head!.next = current;
      this.tailIndex++;
      this.size++
      return this
    }

    for (let i = 0; i < index; i++) {
      prev = current;
      current = current!.next;
    }

    prev!.next = node;
    node.next = current;
    this.tailIndex++;
    this.size++

    return this
  }

  popToIndex(index: number) {
    let current = this.head;
    let prev = current;
    if (!this.head) {
      return this
    }
    if (index === 0) {
      this.head = this.head!.next;
      this.tailIndex--;
      this.size--;
      return this
    }
    for (let i = 0; i < index - 1; i++) {
      prev = current;
      current = current!.next;
    }
    prev!.next = current!.next;
    this.tailIndex--;
    this.size--;
    return this
  }

  popHead() {
    if (!this.head) {
      return this
    } else {
      this.head = this.head.next
    }
    this.tailIndex--;
    this.size--;
  }

  popTail() {
    if (!this.head) {
      return this
    } else {
      let prev = this.head;
      while (prev.next?.next) {
        prev = prev.next
      }
      prev.next = null
    }
    this.size--;
    this.tailIndex--;
    return this;
  }

  print() {
    let curr = this.head;
    let res = [];
    while (curr) {
      res.push(`${curr.value}`);
      curr = curr.next;
    }
    return res;
  }
  getSize = () => this.size;
  getHeadIndex = () => this.headIndex;
  getTailIndex = () => this.tailIndex;
}


const firstArr = ['0', '34', '8', '1'];
const time = 500;


export const ListPage: React.FC = () => {
  const [list] = useState(new LinkedList<string>(firstArr));
  const [listItems, setListItems] = useState<string[]>(firstArr);
  const [inputValue, setInputValue] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<number>(0);
  const [headSmallCircle, setHeadSmallCircle] = useState<number | null>(null);
  const [tailSmallCircle, setTailSmallCircle] = useState<number | null>(null);
  const [headIndex, setHeadIndex] = useState<number>(list.getHeadIndex());
  const [tailIndex, setTailIndex] = useState<number>(list.getTailIndex());
  const [colorSmall, setColorSmall] = useState<number | null>(null);
  const [colorChanging, setColorChanging] = useState<number | null>(null);
  const [delItem, setDelItem] = useState<number | null>(null);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  }
  const onChangeIndex = (e: React.FormEvent<HTMLInputElement>) => {
    setInputIndex(Number(e.currentTarget.value));
  }

  const addTail = async () => {
    setTailIndex(list.getTailIndex());
    setHeadSmallCircle(tailIndex);
    list.addTail(inputValue);
    await delay(time);
    setHeadSmallCircle(null);
    setListItems(list.print());
    setColorSmall(list.getTailIndex());
    setTailIndex(list.getTailIndex())
    await delay(time);
    setColorSmall(null);
  }

  const addHead = async () => {
    setHeadSmallCircle(headIndex);
    list.addHead(inputValue);
    await delay(time)
    setTailIndex(list.getTailIndex());
    setHeadSmallCircle(null);
    setListItems(list.print());
    setColorSmall(list.getHeadIndex());
    await delay(time);
    setColorSmall(null);

  }

  const addToIndex = async () => {
    list.addToIndex(inputValue, inputIndex);
    for (let i = 0; i <= inputIndex; i++) {
      await delay(time);
      setColorChanging(i)
      setHeadSmallCircle(i);
    }

    await delay(time);
    setColorChanging(null)
    setColorSmall(inputIndex);
    setTailIndex(list.getTailIndex());
    setHeadSmallCircle(null)
    setListItems(list.print());
    await delay(time);

    setColorSmall(null);
    await delay(time);

  }

  const popToIndex = async () => {
    list.popToIndex(inputIndex);
    for (let i = 0; i <= inputIndex; i++) {
      setColorChanging(i)
      await delay(time);
    }
    setTailSmallCircle(inputIndex - 1);
    setDelItem(inputIndex - 1);
    setColorChanging(inputIndex - 1);
    await delay(time);
    setColorChanging(null);
    setTailSmallCircle(null)
    setColorSmall(null);
    setListItems(list.print());
    setTailIndex(list.getTailIndex());
    setDelItem(null);
  }

  const popTail = async () => {
    setTailIndex(list.getTailIndex());
    setTailSmallCircle(tailIndex);
    list.popTail();
    await delay(time)
    setTailIndex(list.getTailIndex());
    setTailSmallCircle(null);
    setListItems(list.print());
  }
  const popHead = async () => {
    setHeadIndex(list.getHeadIndex());
    setTailSmallCircle(headIndex);
    list.popHead();
    await delay(time);
    setHeadIndex(list.getHeadIndex());
    setTailSmallCircle(null);
    setListItems(list.print());
    setTailIndex(list.getTailIndex());
  }

  const validation = ((inputIndex > list.getSize() + 1) || (inputIndex < 0)) ? true : false;

  return (
    <SolutionLayout title="Связный список">
      <form onChange={e => e.preventDefault()} className={styles.form}>
        <Input extraClass={styles.input} maxLength={4} isLimitText={true} placeholder={'Введите значение'} onChange={e => onChange(e)} />
        <Button
          extraClass={styles.btn}
          text={'Добавить в head'}
          onClick={addHead}
        />
        <Button
          extraClass={styles.btn}
          text={'Добавить в tail'}
          onClick={addTail}
        />
        <Button
          extraClass={styles.btn}
          text={'Удалить из head'}
          onClick={popHead}
        />
        <Button
          extraClass={styles.btn}
          text={'Удалить из tail'}
          onClick={popTail}
        />
      </form>
      <form onChange={e => e.preventDefault()} className={`${styles.form} ${styles.formIndex}`}>
        <Input max={list.getSize() + 1} type='number' isLimitText={true} extraClass={styles.input} placeholder={'Введите индекс'} onChange={e => onChangeIndex(e)} />
        <Button
          extraClass={styles.btnIndex}
          text={'Добавить по индексу'}
          onClick={addToIndex}
        />
        <Button
          extraClass={styles.btnIndex}
          text={'Удалить по индексу'}
          onClick={popToIndex}
          disabled={validation}
        />

      </form>
      {listItems &&
        <ul className={styles.circle}>

          {listItems?.map((item, index) => {
            return (
              <li className={styles.circleItems} key={index}>
                < Circle
                  head={
                    headSmallCircle! === index ?
                      <Circle state={'changing'} letter={inputValue} isSmall />
                      : headIndex === index ? 'head' : ''
                  }
                  letter={delItem === index ? '' : item}
                  key={index}
                  index={index}
                  state={colorChanging && colorChanging > index ? 'changing' : colorSmall! === index ? 'modified' : 'default'}
                  tail={tailSmallCircle! === index ?
                    <Circle state={'changing'} letter={item} isSmall />
                    : tailIndex! === index ? 'tail' : ''}
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
