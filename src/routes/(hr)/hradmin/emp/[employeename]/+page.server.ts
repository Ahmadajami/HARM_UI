import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { type Applicant } from '$lib/applicanttypes';
import { type Benefit, type Employee } from '$lib/mytypes';

export const load: PageServerLoad = async ({ url, params }) => {
	const type = url.searchParams.get('type');
	console.log(params.employeename);

	if (type) {
		if (type === 'app') {
			const emp: Applicant = {
				id: 1,
				username: 'applicant1',
				password: null,
				firstName: 'AA',
				lastName: 'tony',
				fatherName: 'baba',
				motherName: 'mama',
				ssn: '111xxxx1x111xx',
				degree: 'PHD',
				placeOfBirth: 'SYRIA',
				dateOfBirth: new Date('2001-01-05'),
				number: '09xxxxxx',
				residence: 'midan',
				prevCompany: 'joyBox'
			};

			return { app: emp };
		} else if (type === 'emp') {
			const emp: Employee = {
				id: 5,
				username: 'abd2',
				password: null,
				firstName: 'sdfsdf',
				lastName: 'SDfsdf',
				fatherName: 'werwerwer',
				motherName: 'sdfsadf',
				ssn: '23432432423410',
				degree: 'phd',
				placeOfBirth: 'sdfsadf',
				dateOfBirth: new Date('2001-01-05'),
				number: '0933234234',
				residence: 'midan bijaneb alklb alaswad',
				position: 'juniorDev',
				salary: 2332.3,
				contractNumber: 'A234234',
				manager: {
					managerFirstName: 'fgfg',
					managerLastName: 'dsfasfds',
					mangerUsername: 'abdm'
				},
				benefits: [
					{
						id: 1,
						name: 'Transportation',
						cutPercentage: 2.3
					},
					{
						id: 2,
						name: 'Health insurance',
						cutPercentage: 3.33
					}
				],
				warnings: [
					{
						id: 1,
						description: 'dsf',
						warningType: {
							id: 1,
							name: 'Late',
							mark: 1
						},
						employeeUsername: 'abd2',
						issuerManager: 'abdm'
					}
				]
			};
			const benfits: Benefit[] = [
				{
					id: 1,
					name: 'Transportation',
					cutPercentage: 2.3
				},
				{
					id: 2,
					name: 'Health insurance',
					cutPercentage: 3.33
				}
			];

			return { emp: emp, benfits: benfits };
		} else {
			error(404, { message: 'query is wrong', code: '404' });
		}
	}
};
