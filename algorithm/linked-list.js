
class _Node {
  constructor (value, next) {
    this.value = value,
    this.next = next;
  }
}

class LinkedList {
  constructor () {
    this.head = null;
  }

  insertFirst (item) {
    if (this.head === null) {
      this.head = new _Node(item, null);
    } else {
      const currentPointer = this.head;
      this.head = new _Node(item, currentPointer);
    }
  }

  insertLast (item) {
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

  insertAt (newItem, position) {
    // List is empty or insertion point is the beginning
    if (this.head === null || position === 1) {
      this.insertFirst(newItem);
    }

    let currentNode = this.head;
    let previousNode;

    // Initialize at 1 to loop through to the end node
    for (let i = 1; i < position; i++) {
      previousNode = currentNode;
      currentNode = currentNode.next;
      if (currentNode === null) {
        throw new Error('Couldn\'t perform this action. Check your inputs and try again!');
      }
    }
    previousNode.next = new _Node(newItem, currentNode);
  }

  peek () {
    if (this.head === null) {
      throw new Error('Item not found');
    }
    return this.head;
  }
}

module.exports = LinkedList;
