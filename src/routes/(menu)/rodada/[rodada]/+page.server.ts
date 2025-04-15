import type { MatchGuess } from '$lib/types';
import type { Actions, PageServerLoad } from './$types';
import { error, fail } from '@sveltejs/kit';

export const load = (async ({ fetch, params }) => {
	const guesses: MatchGuess[] = await fetch('/api/match-guesses/round/' + params.rodada, {
		method: 'GET'
	}).then(async (response) => {
		const responseJson = await response.json();
		if (response.ok) {
			return responseJson;
		}

		error(response.status, { message: responseJson.message });
	});

	return { guesses };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ fetch, request }) => {
		const formData = await request.formData();
		const id = formData.get('guess_id') as string;
		const data = JSON.stringify({
			home_score: Number(formData.get('home_score')),
			away_score: Number(formData.get('away_score'))
		});

		const response = await fetch('/api/match-guesses/' + id, {
			method: 'PATCH',
			body: data
		});

		if (!response.ok) {
			const { message } = await response.json();
			return fail(400, {
				message: message || 'Ocorreu um erro ao atualizar o palpite. Tente novamente mais tarde.'
			});
		}
	}
} satisfies Actions;
