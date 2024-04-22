export interface DescriptionInterface {
	text: string;
	images: string[];
}

export class DescriptionProjection implements DescriptionInterface {
	constructor(public text: string, public images: string[]) {
		this.text = text;
		this.images = images;
	}
}
