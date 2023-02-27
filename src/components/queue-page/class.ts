interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak?: () => (T | null)[];
  printQueue: () => Array<T | undefined>;
  getTail: () => void;
  getHead: () => void;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | undefined)[] = [];
  private head: number = 0 ;
  private tail: number = 0;
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
    if (this.tail === this.size) {
      return this
    }
    
    this.container[this.tail % this.size] = item

    this.tail++;
    this.length++;

  }

  dequeue = () => {
    if (this.head === this.size - 1) {
      this.container[this.head % this.size] = undefined;
      return this
    } else if (!this.isEmpty()) {
      this.container[this.head % this.size] = undefined;
      this.head++;
      this.length--;
    }
    
    console.log(this.isEmpty())
  }

  reset = () => {
    this.head = 0;
    this.tail = 0;
    this.container = Array(this.size);
  }
  getTail = () => this.tail;
  getHead = () => this.head;

  printQueue = (): (T | undefined)[] => {
    return [...this.container];
  }

  isEmpty = () => this.length === 0;
}