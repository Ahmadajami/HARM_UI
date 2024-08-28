import type { Vacations } from '$lib/mytypes';
import { addpath } from '$lib/serverurl';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(302, '/');
	///api/vacation/listAll no approved url
	const nv_listurl: URL = addpath('/api/vacation/listAll');
	const nv_call = await fetch(nv_listurl, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + locals.user.token
		}
	});
	if (!nv_call.ok) {
		error(400, { id: 999, codes: '401', messages: 'server erorr ', message: 'erorr' });
	}
	const v: Vacations[] = await nv_call.json();
	//not approveed vacations
	const tv_listurl: URL = addpath('/api/vacation/listAllApproved');
	const tv_call = await fetch(tv_listurl, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + locals.user.token
		}
	});
	if (!tv_call.ok) {
		error(400, { id: 999, codes: '401', messages: 'server erorr ', message: 'erorr' });
	}
	const tv: Vacations[] = await tv_call.json();
	console.log(tv);

	return {
		nv_list: v,
		tv_list: tv
	};
};
export const actions: Actions = {
	app: async ({ request, locals }) => {
		const Form_data = Object.fromEntries(await request.formData());
		console.log('Vacations adds', Form_data);
		///api/vacation/approveRequest?vacationId=4
		const Approveurl: URL = addpath(
			'/api/vacation/approveRequest',
			`vacationId=${Form_data.vacationid}`
		);

		const Approvecall = await fetch(Approveurl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + locals.user.token
			}
		});
		if (!Approvecall.ok) {
			error(400, {
				id: 999,
				codes: '401',
				messages: 'server erorr ',
				message: 'erorr'
			});
		}

		return { vapp: true };
	}
};
