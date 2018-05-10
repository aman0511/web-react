let instance = null;

export default class Singleton {  
  constructor() {
    if (!instance) {
      instance = this;
    }
    this.authorization = null;
    return instance;
  }
}
