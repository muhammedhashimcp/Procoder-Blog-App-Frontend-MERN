
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			screens: {
				'3xl': '1600px',
			},
			
		},

	},
	plugins: [require("@tailwindcss/line-clamp")],
}
