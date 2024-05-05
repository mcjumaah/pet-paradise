import { Gender } from "../model/customer";

export interface CustomerInterface {
	id: number;
	username: string;
	firstName: string;
	lastName: string;
	middleName: string;
	email: string;
	address: string;
	phoneNumber: string;
	gender: Gender;
	birthDate: string;
}

export class CustomerProjection implements CustomerInterface {
	constructor(
		public id: number,
		public username: string,
		public firstName: string,
		public lastName: string,
		public middleName: string,
		public email: string,
		public address: string,
		public phoneNumber: string,
		public gender: Gender,
		public birthDate: string
	) {
		this.id = id;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.middleName = middleName;
		this.email = email;
		this.address = address;
		this.phoneNumber = phoneNumber;
		this.gender = gender;
		this.birthDate = birthDate;
	}
}
