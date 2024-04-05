/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
		  colors: {
			primary: {
			  50: '#fff5f2',
			  100: '#b5ccf5',
			  200: '#a3bff2',
			  300: '#91b3f0',
			  400: '#7ea6ed',
			  500: '#6c99eb',
			  600: '#598de8',
			  700: '#4780e6',
			  800: '#184eaf',
			  900: '#061228'
			}
		  }
		}
	},

	plugins: [require('flowbite/plugin')],
};

module.exports = config;
