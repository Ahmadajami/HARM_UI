import { addpath } from '$lib/serverurl';
import { error, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';
import type { ApplicationInfo } from '$lib/applicanttypes';

export const load: PageServerLoad = async ({ params, locals }) => {
	/* [1] /api/applicant/findByUsername?username=abd1  */
	const applicanturl: URL = addpath(
		'/api/applicant/findByUsername',
		`username=${params.applicantusername}`
	);
	const applicantcall = await fetch(applicanturl, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + locals.user.token
		}
	});
	if (!applicantcall.ok) {
		error(400, { id: 999, codes: '401', messages: 'server erorr ', message: 'erorr' });
	}
	/* [2] /api/application/listAllByApplicant?applicantUsername=abd1 */
	const Applicationurl: URL = addpath(
		'/api/application/listAllByApplicant',
		`applicantUsername=${params.applicantusername}`
	);
	const Applicationcall = await fetch(Applicationurl, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + locals.user.token
		}
	});
	if (!Applicationcall.ok) {
		error(400, { id: 999, codes: '401', messages: 'server erorr ', message: 'erorr' });
	}

	const app: ApplicationInfo[] = await Applicationcall.json();
	console.log('application from slug inter view', app);
	return {
		slug: params.applicantusername,
		Application: app,
		applicant: await applicantcall.json()
	};
};
export const actions: Actions = {
	default: async ({ request, locals }) => {
		const Form_data = Object.fromEntries(await request.formData());
		console.log('Hire form ', Form_data);

		const Hireurl: URL = addpath('/api/application/hire');
		const Hirecall = await fetch(Hireurl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + locals.user.token
			},
			body: JSON.stringify({
				applicationId: Form_data.applicationid,
				managerUsername: Form_data.MangerUsername,
				salary: Form_data.salary,
				contractNumber: Form_data.contractNumber
			})
		});
		if (!Hirecall.ok) {
			error(400, { id: 999, codes: '401', messages: 'server erorr ', message: 'erorr' });
		}
		throw redirect(303, `/hradmin/emp?Hired=${true}`);
	}
};
