import { type Actions } from '@sveltejs/kit';
//import type { PageServerLoad } from './$types';
import { z } from 'zod';
import type { Authuser, Login_Response } from '$lib/mytypes';
import { addpath } from '$lib/serverurl';

/*export const load: PageServerLoad = async () => {
	throw redirect(302, '/');
};*/

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const Login_schema = z.object({
			username: z.string().min(2, { message: 'too short username🥲' }),
			password: z.string().min(2, { message: 'too short password🥲 ' })
		});
		//console.log('you hit your Action from components ');
		const Form_data = Object.fromEntries(await request.formData());

		const validate = Login_schema.safeParse({
			username: Form_data.username,
			password: Form_data.password
		});
		if (validate.success) {
			console.log('done validatione');

			const url: URL = addpath('/api/auth/login');
			const LoginResponse = await fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username: validate.data.username,
					password: validate.data.password
				})
			});
			if (!LoginResponse.ok) {
				console.log('Logged in with erorr from kasar');
				return { done: false };
			}

			const authenticatedUser: Login_Response = await LoginResponse.json();
			const user: Authuser = {
				username: validate.data.username,
				accessToken: authenticatedUser.accessToken,
				refreshToken: authenticatedUser.refreshToken,
				tokenType: authenticatedUser.tokenType,
				role: authenticatedUser.role
			};
			//console.log('response is from tot', user);
			cookies.set('session', JSON.stringify(user), {
				// send cookie for every page
				path: '/',
				// server side only cookie so you can't use `document.cookie`
				httpOnly: true,
				// only requests from same site can send cookies
				// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
				sameSite: 'strict',
				// only sent over HTTPS in production
				secure: process.env.NODE_ENV === 'production',
				///*! set cookie to expire after 8 hour*/
				maxAge: 60 * 60 * 8
			});
			//? logged in succsesfully
			/*if (user.role === 'HR') {
				throw redirect(302, '/');
			}*/
			console.log('cookie been setted');
			return { done: true };
		} else {
			console.log('validation error');
			if (validate.error.issues[0]) {
				if (validate.error.issues[1]) {
					return { done: false };
				}
				return { done: false };
			}
		}
	}
};
