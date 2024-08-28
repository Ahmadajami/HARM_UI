import { addpath } from '$lib/serverurl';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const Pendingurl: URL = addpath(
		'/api/vacation/listAllByEmployee',
		`employeeUsername=${locals.user.name}`
	);

	const PendingListcall = await fetch(Pendingurl, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + locals.user.token
		}
	});
	if (!PendingListcall.ok) {
		error(400, {
			id: 999,
			codes: '401',
			messages: 'server erorr ',
			message: 'erorr'
		});
	}
	return { pending: await PendingListcall.json() };
}) satisfies PageServerLoad;
