export class Store {
  public id: number;
  public name: string;
  public location: string;

  constructor(id: number, name: string, location: string) {
    this.id = id;
    this.name = name;
    this.location = location;
  }
}

// interface IStore {
//   name: string;
//   active: boolean;
// }
//
// export const Store: IStore[] = [
//   {name: 'Kroger', active: false},
//   {name: 'Lowe\'s', active: false},
//   {name: 'Publix', active: false},
//   {name: 'Trader Joe\'s', active: false},
// ];
