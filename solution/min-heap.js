
class MinHeap {
  constructor() {
    this.heap = [];
  }

  getParentIndex(i) { return Math.floor((i - 1) / 2); }
  getLeftChildIndex(i) { return 2 * i + 1; }
  getRightChildIndex(i) { return 2 * i + 2; }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  insert(key) {
    this.heap.push(key);
    let index = this.heap.length - 1;

    while (index !== 0 && this.heap[this.getParentIndex(index)].entry.date > this.heap[index].entry.date) {
      this.swap(index, this.getParentIndex(index));
      index = this.getParentIndex(index);
    }
  }

  remove() {
    const size = this.heap.length;
    if (size === 0) return null;
    this.swap(0, size - 1);
    const item = this.heap.pop();
    this.heapify(0);
    return item;
  }

  heapify(i) {
    const left = this.getLeftChildIndex(i);
    const right = this.getRightChildIndex(i);
    let smallest = i;

    if (left < this.heap.length && this.heap[left].entry.date < this.heap[smallest].entry.date) {
      smallest = left;
    }
    if (right < this.heap.length && this.heap[right].entry.date < this.heap[smallest].entry.date) {
      smallest = right;
    }

    if (smallest !== i) {
      this.swap(i, smallest);
      this.heapify(smallest);
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.heap[0];
  }
}

module.exports = {
  MinHeap
}