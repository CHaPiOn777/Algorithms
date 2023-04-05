import { TNumber } from "../components/sorting-page/sorting-page";

export const swap = (arr: string[] | TNumber, firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;

}

export const delay = (ms: number) => new Promise<void>(
  resolve => setTimeout(resolve, ms)
)