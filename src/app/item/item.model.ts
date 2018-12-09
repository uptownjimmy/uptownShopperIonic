/**
 * Created by uptownjimmy on 12/8/18.
 */

export class Item {
	public id: number;
	public name: string;
	public item_Type: number;
	public active: boolean;
	public notes: string;

	constructor(
		name: string,
		item_Type: number,
		active: boolean,
		notes: string,
		id?: number
	) {
		this.name = name;
		this.item_Type = item_Type;
		this.active = active;
		this.notes = notes;
		this.id = id;
	}
}
