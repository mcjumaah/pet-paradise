export interface PriceInterface {
	id: number;
	value: number;
	selections: {
		name: string;
		variety: string;
	}[];
}

export class PriceProjection implements PriceInterface {
	constructor(
		public id: number,
		public value: number,
		public selections: {
			name: string;
			variety: string;
		}[]
	) {
		this.id = id;
		this.value = value;
		this.selections = selections;
	}
}
