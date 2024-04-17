export interface CustomerInterface {
	id: number;
	firstName: string;
	lastName: string;
	middleName: string;
	email: string;
	address: string;
	phoneNumber: string;
}

export class CustomerProjection implements CustomerInterface {
	constructor(
		public id: number,
		public firstName: string,
		public lastName: string,
		public middleName: string,
		public email: string,
		public address: string,
		public phoneNumber: string
	) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.middleName = middleName;
		this.email = email;
		this.address = address;
		this.phoneNumber = phoneNumber;
	}
}
