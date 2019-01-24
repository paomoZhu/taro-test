import { observable, action } from "mobx";

// const counterStore = observable({
//   counter: 0,
//   counterStore() {
//     this.counter++;
//   },
//   increment() {
//     this.counter++;
//   },
//   decrement() {
//     this.counter--;
//   },
//   incrementAsync() {
//     setTimeout(() => {
//       this.counter++;
//     }, 1000);
//   }
// });

class CounterStore {
  @observable counter = 0;
  @action.bound
  counterStore() {
    this.counter++;
  }
  @action.bound
  increment() {
    this.counter++;
  }
  @action.bound
  decrement() {
    this.counter--;
  }
  @action.bound
  incrementAsync() {
    setTimeout(() => {
      this.counter++;
    }, 1000);
  }
}

const counterStore = new CounterStore();

export default counterStore;
