import type { HandleFetch } from '@sveltejs/kit';

export const handleFetch: HandleFetch = async ({ request, fetch }) => {
	request.headers.set('credentials', 'include');
	if (request.method !== 'GET') {
		request.headers.set('Content-Type', 'application/json');
	}
	return fetch(request);
};
