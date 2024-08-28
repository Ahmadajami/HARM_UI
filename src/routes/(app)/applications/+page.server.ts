import { type ApplicationInfo } from '$lib/applicanttypes';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { addpath } from '$lib/serverurl';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(303, '/');
	const url: URL = addpath(
		'/api/application/listAllByApplicant',
		`applicantUsername=${locals.user.name}`
	);

	const My_app_list = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + locals.user.token
		}
	});
	if (!My_app_list.ok)
		error(400, { id: 999, codes: '401', messages: 'server erorr ', message: 'erorr' });

	const lin: ApplicationInfo[] = await My_app_list.json();

	return { linset: lin, Intrenship: lin };
};
