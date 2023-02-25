interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak?: () => (T | null)[];
  printQueue: () => Array<T | undefined>;
  getTail: () => void
}

export class Queue<T> implements IQueue<T> {
  private container: (T | undefined)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }


  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.tail % this.size] = item
    this.tail++;
    this.length++;
    console.log(this.tail)
  }

  dequeue = () => {
    if (!this.isEmpty()) {
      this.container[this.head % this.size] = undefined;
      this.head++;
      this.length--;
    }
  }
  getTail = () => this.tail;

  printQueue = (): (T | undefined)[] => {
    return [...this.container];
  }

  isEmpty = () => this.length === 0;
}