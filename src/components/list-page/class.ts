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
        for (let i = 0; i < index; i++) {
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