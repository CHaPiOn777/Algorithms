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
  append: (el: T) => void;
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
    values.forEach(value => this.append(value))
  }

  enqueue(element: T) {
    const node = new Node(element);
    let current;
    current = this.head
    this.head = node;
    this.head!.next = current
    return this
  }
  append(element: T) {
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
    // console.log(this.size)
    this.size++;
    this.tailIndex++
    return this
  }
  print() {
    let curr = this.head;
    let res = [];
    while (curr) {
      res.push(`${curr.value}`);
      curr = curr.next;
    }
    return res
  }
  getSize = () => this.size;
  getHeadIndex = () => this.headIndex;
  getTailIndex = () => this.tailIndex;

}
const firstArr = ['0', '34', '8', '1'];

export const ListPage: React.FC = () => {
  const [list] = useState(new LinkedList<string>(firstArr));
  const [listItems, setListItems] = useState<string[]>(firstArr);
  const [inputValue, setInputValue] = useState<string>('');
  const [headSmallCircle, setHeadSmallCircle] = useState<number | null>(null);
  const [headIndex, setHeadIndex] = useState<number>(list.getHeadIndex());
  const [tailIndex, setTailIndex] = useState<number>(list.getTailIndex());
  const [colorIndex, setColorIndex] = useState<number | null>(null)

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  }

  const addTail = async () => {
    await delay(500)
    setHeadSmallCircle(list.getSize())
    list.append(inputValue);
    await delay(500);
    setHeadSmallCircle(null);
    setListItems(list.print());
    setColorIndex(list.getSize());
    setTailIndex(list.getTailIndex())
    await delay(500);
    setColorIndex(null);
  }

  const addHead = async () => {
    await delay(500)
    list.enqueue(inputValue);
    setListItems(list.print());
  }

  return (
    <SolutionLayout title="Связный список">
      <form onChange={e => e.preventDefault()} className={styles.form}>
        <Input extraClass={styles.input} maxLength={4} isLimitText={true} placeholder={'Введите значение'} onChange={e => onChange(e)} />
        <Button extraClass={styles.btn} text={'Добавить в head'} onClick={addHead} />
        <Button extraClass={styles.btn} text={'Добавить в tail'} onClick={addTail} />
        <Button extraClass={styles.btn} text={'Удалить из head'} onClick={addTail} />
        <Button extraClass={styles.btn} text={'Удалить из tail'} onClick={addTail} />
      </form>
      <form onChange={e => e.preventDefault()} className={`${styles.form} ${styles.formIndex}`}>
        <Input extraClass={styles.input} value={''} placeholder={'Введите индекс'} onChange={e => onChange(e)} />
        <Button extraClass={styles.btnIndex} text={'Добавить по индексу'} onClick={addTail} />
        <Button extraClass={styles.btnIndex} text={'Удалить по индексу'} onClick={addTail} />

      </form>
      {listItems &&
        <ul className={styles.circle}>

          {listItems?.map((item, index) => {
            return (
              <li className={styles.circleItems}>
                < Circle
                  head={
                    headSmallCircle! === index ?
                      <Circle state={'changing'} letter={inputValue} isSmall />
                      : headIndex === index ? 'head' : ''
                  }
                  letter={item}
                  key={index}
                  index={index}
                  state={colorIndex! === index ? 'modified' : 'default'}
                  tail={tailIndex! === index ? 'tail' : ''}
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
