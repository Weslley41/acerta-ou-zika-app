import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

// @ts-expect-error aparentemente não dá pra definir um tipo
export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	return defineConfig({
		plugins: [tailwindcss(), sveltekit(), SvelteKitPWA()],
		define: {
			'process.env.NODE_ENV': '"production"'
		}
	});
};
