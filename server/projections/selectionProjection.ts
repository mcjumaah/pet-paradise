export interface SelectionInterface {
	name: string;
	varieties: string[];
}
export interface SelectionOnPriceInterface extends Omit<SelectionInterface, "varieties"> {
	variety: string;
}

export class SelectionProjection implements SelectionInterface {
	constructor(public name: string, public varieties: string[]) {
		this.name = name;
		this.varieties = varieties;
	}
}
export class SelectionOnPriceProjection implements SelectionOnPriceInterface {
	constructor(public name: string, public variety: string) {
		this.name = name;
		this.variety = variety;
	}
}
