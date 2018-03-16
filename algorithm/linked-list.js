
class _Node {
  constructor(value, next) {
    this.value = value,
    this.next = next;
  }
}

class LinkedList {
  constructor(head) {
    this.head = head === undefined? null : head.head;
  }

  insertLast(item) {
    if (this.head === null) {
      this.head = new _Node(item, null);
    } else {
      let currentNode = this.head;
      while (currentNode.next !== null) {
        currentNode = currentNode.next;
      }

      currentNode.next = new _Node(item, null);
    }
  }

  insertAt(item, position) {
    let currentNode = this.head;
    let previousNode;

    for (let i = 0; i <= position; i++) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    this.head = this.head.next;
    previousNode.next = item;
    item.next = currentNode;
  }

  doubleMemValue() {
    const size = this.size();
    // Make sure we're not trying to move item to a position that doesnt exist
    this.head.value.timesCorrect++;
    this.head.value.timesSeen++;
    this.head.value.memoryValue = Math.min(size - 1, this.head.value.memoryValue * 2);
  }

  resetMemValue() {
    this.head.value.timesSeen++;
    this.head.value.memoryValue = 1;
  }

  peek() {
    if (this.head === null) {
      throw new Error('Item not found');
    }
    return this.head.value;
  }

  display() {
    const results = [];
    let currentNode = this.head;
    while (currentNode !== null) {
      results.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return results;
  }

  size() {
    let counter = 0;
    let currentNode = this.head;
    while (currentNode !== null) {
      currentNode = currentNode.next;
      counter++;
    }
    return counter;
  }
}

module.exports = LinkedList;
