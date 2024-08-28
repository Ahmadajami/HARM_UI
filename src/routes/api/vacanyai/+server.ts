import { json } from '@sveltejs/kit';

export async function POST(event) {
	const data = await event.request.json();

	// subscribe the user to the newsletter
	console.log('from Vacancy Ai end point', data);

	// it's common to return JSON, so SvelteKit has a helper
	return json({
		salary: 199.9,
		string_salary: '100'
	});
}
