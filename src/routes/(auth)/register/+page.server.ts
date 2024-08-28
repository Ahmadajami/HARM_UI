import type { Actions, PageServerLoad } from './$types';
import { addpath } from '$lib/serverurl';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {};
};
export const actions = {
	default: async ({ request }) => {
		const url: URL = addpath('/api/auth/register');
		const Form_data = Object.fromEntries(await request.formData());

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const registerResponse = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: Form_data.Username,
				password: Form_data.Password,
				firstName: Form_data.FirstName,
				lastName: Form_data.LastName,
				fatherName: Form_data.FatherName,
				motherName: Form_data.MotherName,
				ssn: Form_data.SSN,
				degree: Form_data.Degree,
				placeOfBirth: Form_data.PlaceOfBirth,
				dateOfBirth: Form_data.DateOfBirth,
				number: Form_data.PhoneNumber,
				residence: Form_data.residence,
				email: Form_data.Email
			})
		});
		if (registerResponse.ok) {
			console.log('200ok');
			console.log('End of Register nice!');
			throw redirect(302, `/?Username=${Form_data.Username}`);
		} else {
			console.log('End of Register with erorr');
			error(400, { id: 999, codes: '401', messages: 'Unauthorized', message: 'erorr' });
		}

		//
	}
} satisfies Actions;
