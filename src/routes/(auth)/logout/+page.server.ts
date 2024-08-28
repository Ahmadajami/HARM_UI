import type { PageServerLoad } from './$types';

export const load = (async () => {
	throw redirect(302, '/');
}) satisfies PageServerLoad;
import { redirect, type Actions } from '@sveltejs/kit';

export const actions = {
	default: ({ cookies }) => {
		// eat the cookie
		//const session = cookies.get('session');
		cookies.delete('session', { path: '/' });
		// redirect the user
		throw redirect(302, '/');
	}
} satisfies Actions;
