import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { addpath } from '$lib/serverurl';
import type { Employee } from '$lib/mytypes';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(302, '/');
	///api/employee/findByUsername?username=abd2
	const Pendingurl: URL = addpath('/api/employee/findByUsername', `username=${locals.user.name}`);

	const infocall = await fetch(Pendingurl, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + locals.user.token
		}
	});
	if (!infocall.ok) {
		console.log(infocall.status);
		error(400, {
			id: 999,
			codes: '401',
			messages: 'server erorr ',
			message: 'erorr'
		});
	}
	return { emp: (await infocall.json()) as Promise<Employee> };
};
