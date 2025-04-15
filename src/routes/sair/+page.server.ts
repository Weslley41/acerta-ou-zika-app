import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const token = cookies.get('access_token');
	if (!token) {
		redirect(302, '/entrar');
	}

	cookies.delete('access_token', { path: '/' });
}) satisfies PageServerLoad;
