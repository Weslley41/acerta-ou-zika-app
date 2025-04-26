import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';
import type { UserRanking } from '$lib/types';

export const load = (async ({ fetch }) => {
	const ranking: UserRanking[] = await fetch(`${PUBLIC_API_URL}/users/ranking/2025`).then(
		async (response) => {
			const responseJson = await response.json();
			if (response.ok) {
				return responseJson;
			}

			error(response.status, { message: responseJson.message });
		}
	);

	return { ranking };
}) satisfies PageServerLoad;
