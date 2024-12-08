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

  //// count size function
  countSize() {
    let count = 0;
    let current = this.head;

    while(current) {
      count++;
      current = current.nextNode;
    }

    return count;
  }

  //// getHead function
  getHead() {
    return this.head;
  }

  //// getTail function
  getTail() {
    let current = this.head;
    while(current !== null && current.nextNode !== null ) {
       current = current.nextNode;   
    }
    return current;      
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

list.append('dog');

list.prepend('alien');

console.log(list);


