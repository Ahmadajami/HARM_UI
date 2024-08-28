import { error, redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { addpath } from '$lib/serverurl';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(302, '/');

	const myempurl: URL = addpath(
		'/api/manager/listEmployeesByManager',
		`?managerUsername=${locals.user.name}`
	);
	const myempcall = await fetch(myempurl, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + locals.user.token
		}
	});
	const warnutl: URL = addpath('/api/warning/listAllWarningTypes');
	const warncalls = await fetch(warnutl, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + locals.user.token
		}
	});
	const warntype = await warncalls.json();
	const employee_list = await myempcall.json();

	return { myemp: employee_list, w_type: warntype };
};

export const actions: Actions = {
	addwarn: async ({ request, locals }) => {
		const Form_data = Object.fromEntries(await request.formData());
		const addwarn: URL = addpath('/api/warning/newWarning');
		const addwarncall = await fetch(addwarn, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + locals.user.token
			},
			body: JSON.stringify({
				warningType: Form_data.Warnigtype,
				employeeUsername: Form_data.emplyeeusername,
				managerUsername: Form_data.mangerusername,
				description: Form_data.desc
			})
		});
		if (!addwarncall.ok) {
			error(400, { id: 999, codes: '401', messages: 'server erorr ', message: 'erorr' });
		}

		return { sw: true };
	},
	addrep: async ({ request, locals }) => {
		const Form_data = Object.fromEntries(await request.formData());
		const addwarn: URL = addpath('/api/reports/addNewReport');
		console.log('report added with this form', Form_data);
		const addwarncall = await fetch(addwarn, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + locals.user.token
			},
			body: JSON.stringify({
				employeeUsername: Form_data.emplyeeusername,
				managerUsername: Form_data.mangerusername,
				reportDescription: Form_data.desc
			})
		});
		if (!addwarncall.ok) {
			error(400, { id: 999, codes: '401', messages: 'server erorr ', message: 'erorr' });
		}
		return { sww: true };
	}
};
