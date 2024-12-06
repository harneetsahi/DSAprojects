// linkedList class

class LinkedList {

  constructor() {
    this.head = null;
  }

  //// append function - adding to the end of the list
  append(value) {
      const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;

      while(current.nextNode !== null) {
        current = current.nextNode;
      }
      current.nextNode = newNode;
    }    
  }

  //// prepend function - adding to the front of the list
  prepend(value) {
    const newNode = new Node(value);

    newNode.nextNode = this.head;
    this.head = newNode;
  }


  

}



// node class

class Node {

  constructor(value, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }

}

// 

const list = new LinkedList();

list.append('solar');

console.log(list);


