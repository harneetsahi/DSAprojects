class HashMap {

  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.bucket = new Array(this.capacity);
  }

  ///// hash function: creates a hash code for keys

  hash(key) {
    let hashCode = 0;
    let primeNum = 31;

    for (let i = 0; i< key.length; i++) {
      hashCode = (hashCode * primeNum + key.charCodeAt(i)) % this.capacity;
      
    }
    return hashCode;
    
  }

  //// set function: sets values to particular keys

  set(key, value) {
    const hashCode = this.hash(key);

    // creating a sub array
    if (!this.bucket[hashCode]) {
      this.bucket[hashCode] = [];
    }

    // updating value for the given key
    for (let i = 0; i<this.bucket[hashCode].length; i++) {
      if (this.bucket[hashCode][i].key === key) {
        this.bucket[hashCode[i].value = value;
        return;
      }
    }

    // adding key, value both if key was not found above
    this.bucket[hashCode].push({key, value});


    // grow bucket
    if (this.bucket.length > this.loadFactor * this.capacity) {
      this.grow();
    }
    
  }

  //// get function: fetches values for particular keys

  get(key) {
    const hashCode = this.hash(key);

    // if bucket does not have the hashCode at all
    if (!this.bucket[hashCode]) {
      return null;
    }

    // if exists
    for (let i = 0; i< this.bucket[hashCode].length; i++) {
      if (this.bucket[hashCode][i].key === key {
        return this.bucket[hashCode][i].value;
      }

    // if key does not exist in the hashCode
    return null;
      
    }
  }

  //// has function
  has(key) {
    const hashCode = this.hash(key);

    if (!this.bucket[hashCode]) return false;

    for (let i = 0; i < this.bucket[hashCode].length; i++) {
      if (this.bucket[hashCode][i].key === key) return true;
    }

    return false;
  }


  //// remove function
  remove(key) {
    const hashCode = this.hash(key);

    for (let i = 0; i < this.bucket[hashCode].length; i++) {
      if (this.bucket[hashCode][i].key === key) {
        this.bucket[hashCode].splice(i, 1);
        return;
      }
    }

    return false;
  }


  //// length function
  length() {
    let count = 0;

    for (let i = 0; i < this.bucket.length; i++) {
      if (this.bucket[i]) {
        count += this.bucket[i].length;
      }
    }
    return count;
  }
  
  
  
}
