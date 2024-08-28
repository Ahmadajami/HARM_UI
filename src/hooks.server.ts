/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Authuser } from '$lib/mytypes';
import { error, redirect, type Handle } from '@sveltejs/kit';
import { Console } from 'console';
import { ChevronDownSquare } from 'lucide-svelte';
const unProtectedRoutes = ['/', '/register', '/login', '/logout', '/api/lokin'];
const ProtectedRoutesManger = ['/empmange', '/vacation', '/vacation/request', '/vacation/pending'];
const ProtectedRoutesEmp = [
	'/view',
	'/vacation',
	'/vacation/request',
	'/vacation/pending',
	'/myinfo'
];
const ProtectedRoutesApplicant = ['/apply', '/applications'];
const ProtectedRoutesHR = ['/apply'];
function applicantRoutes(role: string, url: URL): boolean {
	if (
		role === 'APP' &&
		(isProtectedRoute(url, ProtectedRoutesApplicant) ||
			ProtectedRoutesApplicant.includes(url.pathname) ||
			unProtectedRoutes.includes(url.pathname))
	)
		return true;
	else {
		return false;
	}
}
function isProtectedRoute(url: URL, xp: string[]) {
	xp.forEach((route) => {
		if (url.pathname.startsWith(route)) {
			return true;
		}
	});

	return false;
}
function MangerRoutes(role: string, url: URL): boolean {
	const pathname = url.pathname;
	//console.log(isProtectedRoute(url, ProtectedRoutesManger));
	if (
		role === 'MG' &&
		(ProtectedRoutesManger.includes(pathname) ||
			isProtectedRoute(url, ProtectedRoutesManger) ||
			unProtectedRoutes.includes(pathname))
	)
		return true;
	else {
		return false;
	}
}
function EmpRoutes(role: string, url: URL): boolean {
	const pathname = url.pathname;
	//console.log(isProtectedRoute(url, ProtectedRoutesManger));
	if (
		role === 'EMP' &&
		(ProtectedRoutesEmp.includes(pathname) ||
			isProtectedRoute(url, ProtectedRoutesManger) ||
			unProtectedRoutes.includes(pathname))
	)
		return true;
	else {
		return false;
	}
}

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.user = {
		name: 'ahmad',
		role: 'HR',
		token: 'token',
		refreshtoken: 'token'
	};
	return await resolve(event);
	/*
	const session = event.cookies.get('session');
	console.log('hooks start');
	if (!session) {
		if (unProtectedRoutes.includes(event.url.pathname)) return await resolve(event);
		else {
			console.log('not auth', event.url.pathname);
			error(401, { id: 99, codes: '401', messages: 'Unauthorized', message: 'erorr' });
		}
	} else {
		try {
			console.log('reading cookies in hooks');
			const userToken: Authuser = JSON.parse(session) as Authuser;
			console.log('reading done  in hooks');
			event.locals.user = {
				name: userToken.username ? userToken.username : 'none',
				role: userToken.role,
				token: userToken.accessToken,
				refreshtoken: userToken.refreshToken
			};
			if (userToken.role === 'HR') {
				return await resolve(event);
			} else if (userToken.role === 'MG') {
				if (MangerRoutes(userToken.role, event.url)) {
					return await resolve(event);
				} else {
					//return await resolve(event);

					console.log('manger not allowed');
					throw redirect(303, '/');
				}
			} else if (userToken.role === 'APP') {
				if (applicantRoutes(userToken.role, event.url)) {
					return await resolve(event);
				} else {
					throw redirect(303, '/');
				}
			} else if (userToken.role === 'EMP') {
				if (EmpRoutes(userToken.role, event.url)) {
					return await resolve(event);
				} else {
					throw redirect(303, '/');
				}
			} else {
				throw redirect(303, '/');
			}
		} catch (e) {
			console.log(e);
			return await resolve(event);
		}
	}*/
};
