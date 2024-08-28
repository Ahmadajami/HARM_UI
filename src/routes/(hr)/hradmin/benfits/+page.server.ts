import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { addpath } from '$lib/serverurl';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(303, '/');
	return {};
};
export const actions: Actions = {
	addnew: async ({ request, locals }) => {
		const Form_data = Object.fromEntries(await request.formData());
		console.log('from Newbenfits modal', Form_data);
		const Addbenfitsurl: URL = addpath('/api/benefit/addBenefit');
		const Addbenfitscall = await fetch(Addbenfitsurl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + locals.user.token
			},
			body: JSON.stringify({
				name: Form_data.Benfitsname,
				cutPercentage: Number(Form_data.cutpercentge)
			})
		});
		if (!Addbenfitscall.ok) {
			error(400, { id: 999, codes: '401', messages: 'server erorr ', message: 'erorr' });
		}

		return { done: true };
	},
	del: async ({ request, locals }) => {
		const Form_data = Object.fromEntries(await request.formData());
		console.log('from delete table', Form_data);
		const deletebenfitsurl: URL = addpath(
			'/api/benefit/deleteBenefit',
			`benefitId=${Form_data.benfitsid}`
		);
		//console.log(deletebenfitsurl);
		const deletebenfitscall = await fetch(deletebenfitsurl, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + locals.user.token
			}
		});
		if (!deletebenfitscall.ok) {
			error(400, { id: 999, codes: '401', messages: 'server erorr ', message: 'erorr' });
		}
		return { donedel: true };
	}
};
