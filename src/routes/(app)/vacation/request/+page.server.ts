import { addpath } from '$lib/serverurl';
import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
export const actions: Actions = {
	default: async ({ request, locals }) => {
		if (!locals.user) redirect(302, '/');
		const Form_data = Object.fromEntries(await request.formData());
		const Form_key = Object.keys(Form_data);
		console.log('here', Form_data);
		if (Form_key.includes('payed')) {
			const Approveurl: URL = addpath('/api/vacation/addNewRequest');

			const addpositioncall = await fetch(Approveurl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + locals.user.token
				},
				body: JSON.stringify({
					startDate: Form_data.startdate,
					endDate: Form_data.enddate,
					payed: Form_data.payed === 'on' ? true : false,
					employeeUsername: locals.user.name
				})
			});
			if (!addpositioncall.ok) {
				error(400, {
					id: 999,
					codes: '401',
					messages: 'server erorr ',
					message: 'erorr'
				});
			}

			console.log(Form_data);
			return { done: true };
		} else {
			const Approveurl: URL = addpath('/api/vacation/addNewRequest');
			const addpositioncall = await fetch(Approveurl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + locals.user.token
				},
				body: JSON.stringify({
					startDate: Form_data.startdate,
					endDate: Form_data.enddate,
					payed: false,
					employeeUsername: locals.user.name
				})
			});
			if (!addpositioncall.ok) {
				error(400, {
					id: 999,
					codes: '401',
					messages: 'server erorr ',
					message: 'erorr'
				});
			}
			return { done: true };
		}
	}
};
