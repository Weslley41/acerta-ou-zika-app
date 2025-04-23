import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const load = (async ({ cookies, fetch }) => {
	const token = cookies.get('access_token');
	if (token) {
		const currentRound = await fetch(PUBLIC_API_URL + '/current-round').then((response) => {
			if (response.ok) return response.json();
			return { round: 1 };
		});

		redirect(302, '/rodada/' + currentRound.round);
	}
}) satisfies PageServerLoad;
