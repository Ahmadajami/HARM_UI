import { error, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { type PreviousProjectInputs, type Vacancy } from '$lib/mytypes';
import { addpath } from '$lib/serverurl';

export const load: PageServerLoad = async ({ locals }) => {
	//TODO: protect this route
	if (!locals.user) throw redirect(303, '/');

	const Allvacency = await fetch(addpath('/api/vacancy/listAll'), {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + locals.user.token
		}
	});
	if (!Allvacency.ok) {
		console.log();
		error(400, { id: 999, codes: '401', messages: 'server erorr ', message: 'erorr' });
	}

	const sourceData: Vacancy[] = await Allvacency.json();
	return { table: sourceData };
};
//------end of page load-----
//!--start of an action ...
export const actions: Actions = {
	newappps: async ({ request, locals }) => {
		const ff = await request.formData();
		if (!ff.get(`previousProjectscount`)) {
			error(400, { id: 999, codes: '401', messages: 'Unauthorized', message: 'erorr' });
		}
		const it: number = Number(ff.get(`previousProjectscount`)?.toString());

		const previousProjects: PreviousProjectInputs[] = [];
		for (let i = 0; i < it; i++) {
			//console.log(`PreviousProjectInputs ${i}`);
			previousProjects.push({
				name: ff.get(`npp${i}`)?.toString(),
				companyName: ff.get(`cpp${i}`)?.toString(),
				description: ff.get(`dpp${i}`)?.toString()
			});
		}
		//console.log('my input array ', previousProjects);

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const Form_data = Object.fromEntries(ff);
		const url: URL = addpath('/api/application/addNewApplication');

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + locals.user.token
			},
			body: JSON.stringify({
				motivationLetter: Form_data.MotivationLetter,
				englishLevel: Form_data.EnglishLevel,
				programmingLanguage: Form_data.programmingLanguage,
				previousProjects: previousProjects,
				vacancy: {
					id: Form_data.vacancyid
				},
				applicant: {
					username: Form_data.applicant
				}
			})
		});
		if (res.ok) {
			throw redirect(302, `/applications`);
		} else {
			error(400, { id: 999, codes: '401', messages: 'Unauthorized', message: 'erorr' });
		}

		/*if (!res.ok) {
			console.log('went wrong');
		} else {
			console.log('Nice', await res.json());
		}*/

		//const xx = await res.json();
		//console.log('response from kasar in application applay :', xx);
		/*if (!xx.ok) {
			error(400, { id: 999, codes: '401', messages: 'Unauthorized', message: 'erorr' });
			const vid = Number(Form_data.vacancyid.toString());
			return { success: true, id: vid };
			//throw redirect(302, `/apply`);
		} else {
			throw redirect(302, `/apply`);
			//error(400, { id: 999, codes: '401', messages: 'Unauthorized', message: 'erorr' });
		}*/
	}
};
