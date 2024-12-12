class HashMap {

  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.bucket = new Array(this.capacity);
  }

  ///// hash function

  hash(key) {
    let hashCode = 0;
    let primeNum = 31;

    for (let i = 0; i< key.length; i++) {
      hashCode = (hashCode * primeNum + key.charCodeAt(i)) % this.capacity;
      
    }
    return hashCode;
    
  }
  
  
}
