// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	interface Locals {
		user: {
			name: string;
			role: string;
			token: string;
			refreshtoken: string;
		};
	}
	// interface PageData {}
	// interface Error {}
	interface Error {
		id: number;
		messages: string;
		codes: string;
	}
	// interface Platform {}
}
