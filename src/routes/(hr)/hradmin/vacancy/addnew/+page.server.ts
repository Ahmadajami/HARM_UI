/* eslint-disable @typescript-eslint/no-unused-vars */
import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { dunbarray, type Positions } from '$lib/mytypes';
import { AiURL, addpath } from '$lib/serverurl';
// Fruits
type Aires = {
	salary: Array<number>;
};
const Ai_schema = z.object({
	type: z.string(),
	medium: z.string(),
	yearsOfExperience: z.number(),
	JobDescription: z.string()
});

export const load: PageServerLoad = async ({ locals }) => {
	//if (!locals.user) redirect(302, '/');
	/*	const position_listurl: URL = addpath('/api/position/listAll');
	const postion_listcall = await fetch(position_listurl, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + locals.user.token
		}
	});
	const position: Positions[] = await postion_listcall.json();*/
	return { plist: dunbarray };
};

export const actions: Actions = {
	addv: async ({ request }) => {
		/*const Form_data = Object.fromEntries(await request.formData());
		const Vacancy_addurl: URL = addpath('/api/vacancy/addNewVacancy');
		const Vacancy_addcall = await fetch(Vacancy_addurl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + locals.user.token
			},
			body: JSON.stringify({
				jobTitle: Form_data.Ailist,
				jobSalary: Form_data.jobSalary,
				jobDescription: Form_data.JobDescription,
				yearsOfExperience: Form_data.yearsOfExperience,
				jobType: Form_data.type
			})
		});
		if (!Vacancy_addcall.ok) {
			error(400, { id: 999, codes: '401', messages: 'server erorr ', message: 'erorr' });
		}*/
		return { vadd: true };
	},
	ai: async ({ request }) => {
		const Form_data = Object.fromEntries(await request.formData());
		//const Form_key = Object.keys(Form_data);
		console.log(Form_data);

		return {
			salary: Number(3740033),
			type: Form_data.type,
			Ailist: Form_data.Ailist,
			yearsOfExperience: Form_data.yearsOfExperience,
			JobDescription: Form_data.JobDescription,
			dumbs: true
		};
	}
};
