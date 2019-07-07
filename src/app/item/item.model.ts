/**
 * Created by uptownjimmy on 12/8/18.
 */

export class Item {
  public id: number;
  public name: string;
  public category: string;
  public active: boolean;
  public notes: string;

  constructor(
    name: string,
    category: string,
    active: boolean,
    notes: string,
    id?: number,
  ) {
    this.name = name;
    this.category = category;
    this.active = active;
    this.notes = notes;
    this.id = id;
  }
}
