import { type PreviousProject, type Vacancy } from './mytypes';

export type Applicant = {
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
	prevCompany: string;
};

//? find application by username
export type ApplicationInfo = {
	id: number;
	motivationLetter: string;
	englishLevel: string;
	programmingLanguage: string;
	previousProjects: PreviousProject[];
	applicationDate: string;
	qualifiedForInterview: boolean;
	interviewDate: string | null;
	vacancy: Vacancy;
	applicant: Applicant;
	screeningResults: ScreeningResults | null;
};
export type ScreeningResults = {
	id: number;
	softwareDeveloper: number;
	frontEnd: number;
	networkAdmin: number;
	webDeveloper: number;
	projectManager: number;
	databaseAdmin: number;
	securityAnalyst: number;
	systemAdmin: number;
	pythonDeveloper: number;
	javaDeveloper: number;
};

/*export function splitApplicationsByJobType(applications: ApplicationInfo[]): {
	fullTime: ApplicationInfo[];
	Intrenship: ApplicationInfo[];
} {
	const fullTimeApplications: ApplicationInfo[] = [];
	const Intrenship: ApplicationInfo[] = [];

	for (const application of applications) {
		new Date(application.interviewDate);
		if (application.vacancy.jobType === jobType.FullTime) {
			fullTimeApplications.push(application);
		} else {
			Intrenship.push(application);
		}
	}

	return { fullTime: fullTimeApplications, Intrenship: Intrenship };
}*/
