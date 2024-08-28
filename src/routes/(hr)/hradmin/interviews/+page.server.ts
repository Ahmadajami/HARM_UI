import { addpath } from '$lib/serverurl';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.user) redirect(302, '/');

	const interviewurl: URL = addpath('/api/application/interviews');

	const interviewsListcall = await fetch(interviewurl, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + locals.user.token
		}
	});
	if (!interviewsListcall.ok)
		error(400, { id: 999, codes: '401', messages: 'server erorr ', message: 'erorr' });

	return {
		all: await interviewsListcall.json()
	};
}) satisfies PageServerLoad;
