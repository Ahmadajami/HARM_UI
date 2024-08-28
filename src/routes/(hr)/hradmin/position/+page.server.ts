import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { addpath } from '$lib/serverurl';

export const load: PageServerLoad = async ({ locals }) => {
	///api/position/listAll
	const positionurl: URL = addpath('/api/position/listAll');
	const positioncall = await fetch(positionurl, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + locals.user.token
		}
	});
	if (!positioncall.ok) {
		error(400, { id: 999, codes: '401', messages: 'server erorr ', message: 'erorr' });
	}

	return { lsit: await positioncall.json() };
};
export const actions: Actions = {
	addnewp: async ({ request, locals }) => {
		const Form_data = Object.fromEntries(await request.formData());
		const addpositionurl: URL = addpath('/api/position/addNewPosition');
		const addpositioncall = await fetch(addpositionurl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + locals.user.token
			},
			body: JSON.stringify({
				name: Form_data.Postionname
			})
		});
		if (!addpositioncall.ok)
			error(400, { id: 999, codes: '401', messages: 'server erorr ', message: 'erorr' });
		return { postionsaddedss: true };
	},
	delp: async ({ request, locals }) => {
		const Form_data = Object.fromEntries(await request.formData());

		const deleteurl: URL = addpath(
			'/api/position/deletePosition',
			`positionId=${Form_data.postinsid}`
		);
		const deletecall = await fetch(deleteurl, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + locals.user.token
			}
		});
		if (!deletecall.ok)
			error(400, { id: 999, codes: '401', messages: 'server erorr ', message: 'erorr' });

		return { postionsdonedel: true };
	}
};
