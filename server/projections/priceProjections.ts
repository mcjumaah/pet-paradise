import { SelectionOnPriceProjection } from "./selectionProjection";

export interface PriceInterface {
	id: number;
	value: number;
	selections: SelectionOnPriceProjection[];
}

export class PriceProjection implements PriceInterface {
	constructor(public id: number, public value: number, public selections: SelectionOnPriceProjection[]) {
		this.id = id;
		this.value = value;
		this.selections = selections;
	}
}
