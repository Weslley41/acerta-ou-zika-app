import type { PageServerLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';

export const load = (async ({ fetch }) => {
  const matches = await fetch(`${PUBLIC_API_URL}/matches`, {
    method: 'GET'
  });

  if (!matches.ok) {
    const { error: message } = await matches.json()

    return error(matches.status, {
      message
    });
  }

  return { matches: await matches.json() };
}) satisfies PageServerLoad;
