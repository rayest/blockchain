export default class User {
    constructor(name) {
      this._name = name;
    }
  
    sayHi() {
      console.log(`Hi, I'm ${this._name}`);
    }
}
    