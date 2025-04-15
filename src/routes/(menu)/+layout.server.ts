import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import type { Profile } from '$lib/types';

export const load = (async ({ cookies, fetch }) => {
	const token = cookies.get('access_token');
	if (!token) {
		redirect(302, '/entrar');
	}

	const user: Profile = await fetch('/api/users/profile').then((response) => {
		if (response.ok) return response.json();
	});

	const currentRound = await fetch('/api/current-round').then((response) => {
		if (response.ok) return response.json();
		return { round: 1 };
	});

	return { user, round: currentRound.round };
}) satisfies LayoutServerLoad;
