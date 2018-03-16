
class _Node {
  constructor(value, next) {
    this.value = value,
    this.next = next;
  }
}

class LinkedList {
  constructor(head = null) {
    this.head = head.head;
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
    // List is empty
    if (this.head === null) {
      this.insertFirst(item);
    }

    let currentNode = this.head;
    let previousNode;

    // Initialize at 1 to loop through to the end node
    for (let i = 0; i <= position; i++) {
      previousNode = currentNode;
      currentNode = currentNode.next;
      if (currentNode === null) {
        throw new Error('Couldn\'t perform this action. Check your inputs and try again!');
      }
    }
    // Point head to second item in list
    this.head = this.head.next;
    previousNode.next = item;
    item.next = currentNode;
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
