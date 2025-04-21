import { observable, action, computed, makeAutoObservable } from "mobx";
import api from '../services/api'

export class MapsStore {

  public constructor() {
      makeAutoObservable(this);
  }

  @observable 
  public count: number = 0;

  @observable
  public locationVotes: any = []; 

  @observable
  public locationZone: any = []; 

  @observable
  public locationVotesByNrVotavel: any = []; 


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

  @action
  public obterLocationVotes = () => {
    api.get("geo")
      .then((response) => this.locationVotes = response.data)
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
     });
  }

  @action
  public obterLocationZone = (id: number) => {
    api.get("location/nativeParam/"+id)
      .then((response) => this.locationZone = response.data)
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
     });
  }

  @action
  public clearLocationZone = () => {
    this.locationZone = []
  }

  @action
  public obterLocationVotesByNrVotavel = (nrVotavel: number) => {
    api.get("geo/nrVotavel/"+nrVotavel)
      .then((response) => this.locationVotesByNrVotavel = response.data)
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
     });
  }


  @computed 
  public get formatedCount() {
    return `Counter: ${this.count}`;
  }
}