import type { ApplicationInfo } from '$lib/applicanttypes';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

import { addpath } from '$lib/serverurl';

export const load: PageServerLoad = async ({ params, locals }) => {
	const Vacancy_listurl: URL = addpath(
		'/api/application/listAllByVacancy',
		`vacancyID=${params.vid}`
	);
	const Vacancy_listcall = await fetch(Vacancy_listurl, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + locals.user.token
		}
	});
	if (!Vacancy_listcall.ok) {
		error(400, { id: 999, codes: '401', messages: 'server erorr ', message: 'erorr' });
	}
	const lin: ApplicationInfo[] = await Vacancy_listcall.json();

	///api/vacancy/getVacancyById?vacancyID=1
	return { slug: params.vid, application_listv: lin };
};
export const actions: Actions = {
	interview: async ({ request, locals }) => {
		const Form_data = Object.fromEntries(await request.formData());

		const setinterviewurl: URL = addpath('/api/application/qualifyApplication');
		const setinterviewcall = await fetch(setinterviewurl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + locals.user.token
			},
			body: JSON.stringify({
				applicationId: Form_data.applicationid,
				interviewDate: Form_data.interviewDate + ' ' + Form_data.interviewTime
			})
		});
		if (!setinterviewcall.ok) {
			console.log('interviewcall eror');
			error(400, { id: 999, codes: '401', messages: 'server erorr ', message: 'erorr' });
		}
		throw redirect(302, `/hradmin?Idone=${true}`);
	}
};
