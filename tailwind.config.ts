import { nextui } from "@nextui-org/react";
import { Config } from "tailwindcss/types/config";

export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: "class",
	plugins: [nextui()],
	theme: {
		extend: {
			backgroundImage: {
				bisexual:
					"linear-gradient(135deg, #D70070 0% 25%, #9C4E97 50%, #0035A9 75% 100%)",
				lesbian:
					"linear-gradient(135deg, #D52D00 0%, #D52D00 20%, #FF9A56 20%, #FF9A56 40%, #FFFFFF 40%, #FFFFFF 60%, #D362A4 60%, #D362A4 80%, #A30262 80%, #A30262 100%)",
				nonbinary:
					"linear-gradient(135deg, #FFF430 0%, #FFF430 25%, #FFFFFF 25%, #FFFFFF 50%, #9C59D1 50%, #9C59D1 75%, #000000 75%, #000000 100%)",
				rainbow:
					"linear-gradient(135deg, #FF5F6D 0%, #FFC371 20%, #FFEB3B 40%, #4CAF50 60%, #2196F3 80%, #9C27B0 100%)",
				transgender:
					"linear-gradient(135deg, #5BCEFA 0% 20%, #F5A9B8 20% 40%, #FFF 40% 60%, #5BCEFA 60% 80%, #F5A9B8 80% 100%)",
			},
		},
	},
} as Config;
