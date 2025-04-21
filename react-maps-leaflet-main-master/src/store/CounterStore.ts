import { observable, action, computed, makeAutoObservable } from "mobx";

export class CounterStore {

  public constructor() {
      makeAutoObservable(this);
  }

  @observable 
  public count: number = 0;

  @action 
  incrementCount = () => {
    console.log(this.count)
    this.count++;
  };

  @action 
  public decrementCount = () => {
    console.log(this.count)
    this.count--;
  };

  @action 
  public resetCount = () => {
    this.count = 0;
  };

  @computed 
  public get formatedCount() {
    return `Counter: ${this.count}`;
  }
}