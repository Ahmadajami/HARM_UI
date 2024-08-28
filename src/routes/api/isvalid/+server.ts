import { json } from '@sveltejs/kit';

export async function POST(event) {
	const data = await event.request.json();

	// subscribe the user to the newsletter
	console.log('from is valid end point', data);

	// it's common to return JSON, so SvelteKit has a helper
	return json({
		isValid: true,
		username: 'ahmad',
		role: 'Applicant'
	});
}
