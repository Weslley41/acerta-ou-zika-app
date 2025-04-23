import { PUBLIC_API_URL } from '$env/static/public';
import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ fetch }) => {
	const currentRound = await fetch(PUBLIC_API_URL + '/current-round').then((response) => {
		if (response.ok) return response.json();
		return { round: 1 };
	});

	throw redirect(302, '/rodada/' + currentRound.round);
}) satisfies PageLoad;
