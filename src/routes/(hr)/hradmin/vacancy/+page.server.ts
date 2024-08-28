import type { Vacancy } from '$lib/mytypes';
import { addpath } from '$lib/serverurl';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(302, '/');

	const Vacancy_listurl: URL = addpath('/api/vacancy/listAll');
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
	const All_vacancy: Vacancy[] = await Vacancy_listcall.json();
	return { all_v: All_vacancy };
};
