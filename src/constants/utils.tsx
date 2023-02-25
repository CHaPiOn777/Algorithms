import { resolve } from "path";
import { TNumber } from "../components/sorting-page/sorting-page";
import { TWord } from "../types/strinf";

export const colorSwap = (arr: TWord, firstIndex: number, secondIndex: number): void => {
    arr[secondIndex].color = arr[firstIndex].color = 'changing';
    if (secondIndex === firstIndex) {
      arr[secondIndex].color = 'modified';
    }
    if (secondIndex - firstIndex < 2) {
      arr[secondIndex].color = arr[firstIndex].color = 'modified';
    }
    if (firstIndex !== 0) {
      arr[secondIndex + 1].color = arr[firstIndex - 1].color = 'modified';
    }
  }
  export const swap = (arr: TWord | TNumber, firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
    
  }

  export const delay = (ms: number) => new Promise<void> (
    resolve => setTimeout(resolve, ms)
  )