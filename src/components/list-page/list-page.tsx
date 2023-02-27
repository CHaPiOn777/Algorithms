import React, { useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './list-page.module.css';

export const ListPage: React.FC = () => {
  const [listItems, setListItems] = useState<string[]>(['0', '34', '8', '1'])

  return (
    <SolutionLayout title="Связный список">
      <form onSubmit={e => e.preventDefault()} className={styles.form}>
        <Input extraClass={styles.input} maxLength={4} isLimitText={true} value={''} placeholder={'Введите значение'} />
        <Button extraClass={styles.btn} text={'Добавить в head'} />
        <Button extraClass={styles.btn} text={'Добавить в tail'} />
        <Button extraClass={styles.btn} text={'Удалить из head'} />
        <Button extraClass={styles.btn} text={'Удалить из tail'} />
      </form>
      <form onSubmit={e => e.preventDefault()} className={`${styles.form} ${styles.formIndex}`}>
        <Input extraClass={styles.input} value={''} placeholder={'Введите индекс'} />
        <Button extraClass={styles.btnIndex} text={'Добавить по индексу'} />
        <Button extraClass={styles.btnIndex} text={'Удалить по индексу'} />

      </form>
      {listItems &&
        <ul className={styles.circle}>

          {listItems?.map((item, index) => {
            return (
              <li className={styles.circleItems}>
                < Circle
                  // tail={tail <= head! ? '' : tail - 1 === index ? 'tail' : ''}
                  // head={head === null ? '' : head === index ? 'head' : ''}
                  letter={item}
                  key={index}
                  index={index}
                // state={index === currentIndex ? 'changing' : 'default'}
                />
                {(index < listItems.length - 1) &&
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
