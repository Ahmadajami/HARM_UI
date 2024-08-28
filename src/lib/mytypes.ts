export type Login_Response = {
	accessToken: string;
	refreshToken: string;
	tokenType: string;
	role: string;
};
export type Authuser = {
	username?: string;
	accessToken: string;
	refreshToken: string;
	tokenType: string;
	role: string;
};
export enum jobType {
	FullTime = 'FullTime',
	InternShip = 'InternShip'
}
export enum CardType {
	app = 'Applicant',
	emp = 'emp'
}
export type Vacancy = {
	id: number;
	jobTitle: string;
	jobSalary: number;
	yearsOfExperience: number;
	jobDescription: string;
	jobType: jobType;
	choosed?: boolean;
};
export type PreviousProjectInputs = {
	name?: string;
	companyName?: string;
	description?: string;
};
export type Interviews = {
	applicantUsername: string;
	vacancyName: string;
	date: Date;
};
export type PreviousProject = {
	id: number;
	name: string;
	companyName: string;
	description: string;
};
export type Hirereq = {
	applicationId: string;
	managerUsername: string;
	salary: number;
	contractNumber: string;
};
export type Mangers = {
	managerFirstName: string;
	managerLastName: string;
	mangerUsername: string;
};
export type Employee = {
	id: number;
	username: string;
	password: null;
	firstName: string;
	lastName: string;
	fatherName: string;
	motherName: string;
	ssn: string;
	degree: string;
	placeOfBirth: string;
	dateOfBirth: Date;
	number: string;
	residence: string;
	position: string;
	salary: number;
	contractNumber: string;
	managerDTO: Mangers;
	benefits: Benefit[];
	warnings: Warning[];
	reports?: Reports[];
};
export type Reports = {
	reportDescription: string;
	dateIssued: Date;
	managerUsername: string;
	rating: number;
	reportResult: string;
};

export type Benefit = {
	id: number;
	name: string;
	cutPercentage: number;
};

export type Warning = {
	id: number;
	description: string;
	warningType: WarningType;
	employeeUsername: string;
	issuerManager: string;
};

export type WarningType = {
	id: number;
	name: string;
	mark: number;
};
export type Positions = {
	id: number;
	name: string;
	numberOfEmployees: number;
};
export const dunbarray: Positions[] = [
	{
		id: 1,
		name: 'Java',
		numberOfEmployees: 2
	},
	{
		id: 1,
		name: 'Mobile',
		numberOfEmployees: 2
	},
	{
		id: 1,
		name: 'Python',
		numberOfEmployees: 2
	},
	{
		id: 1,
		name: 'SDE',
		numberOfEmployees: 2
	},
	{
		id: 1,
		name: 'Testing',
		numberOfEmployees: 2
	},
	{
		id: 1,
		name: 'Web',
		numberOfEmployees: 2
	},
	{
		id: 1,
		name: 'Backend',
		numberOfEmployees: 2
	},
	{
		id: 1,
		name: 'Database',
		numberOfEmployees: 2
	},
	{
		id: 1,
		name: 'Frontend',
		numberOfEmployees: 2
	},
	{
		id: 1,
		name: 'IOS',
		numberOfEmployees: 2
	}
];
export type Vacations = {
	id: number;
	startDate: Date;
	endDate: Date;
	payed: boolean;
	numberOfDays: number;
	approved: boolean;
	employeeUsername: string;
};
export type MangerListDTO = {
	username: string;
	password: null;
	firstName: string;
	lastName: string;
	fatherName: string;
	motherName: string;
	ssn: string;
	degree: string;
	placeOfBirth: string;
	dateOfBirth: Date;
	number: string;
	residence: string;
	email: string;
	salary: number;
	contractNumber: null;
	benefits: Benefit[];
	id: number;
};
