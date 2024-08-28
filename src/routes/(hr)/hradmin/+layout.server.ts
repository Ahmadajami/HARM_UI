import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	//if (!locals.user) redirect(302, '/');
	/*
	const interviewurl: URL = addpath('/api/application/interviewsToday');
	const interviewsListcall = await fetch(interviewurl, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + locals.user.token
		}
	});
	///api/manager/listAll
	const managerurl: URL = addpath('/api/manager/listAll');
	const mangersListcall = await fetch(managerurl, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + locals.user.token
		}
	});
	///api/application/interviewsToday

	///api/benefit/listAll
	const benfiturl: URL = addpath('/api/benefit/listAll');
	const BenfitsListcall = await fetch(benfiturl, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + locals.user.token
		}
	});
	//----------------------------------------------------

	if (!interviewsListcall.ok) {
		console.log('interviewsListcall wrong');
		error(400, { id: 999, codes: '401', messages: 'server erorr ', message: 'erorr' });
	}

	if (!mangersListcall.ok) {
		console.log('mangersListcall wrong');
		error(400, { id: 999, codes: '401', messages: 'server erorr ', message: 'erorr' });
	}
	if (!BenfitsListcall.ok) {
		console.log('BenfitsListcall wrong');
		error(400, { id: 999, codes: '401', messages: 'server erorr ', message: 'erorr' });
	}
	//retrive data
	const mangers: Mangers[] = await mangersListcall.json();
	const interviewsList: Interviews[] = await interviewsListcall.json();
	const all_benfit: Benefit[] = await BenfitsListcall.json();
*/
	return {
		user: locals.user
	};
};
