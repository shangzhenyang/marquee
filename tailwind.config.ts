import { heroui } from "@heroui/react";

export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@heroui/react/dist/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: "class",
	plugins: [heroui()],
	theme: {
		extend: {
			backgroundImage: {
				bisexual:
					"linear-gradient(135deg, #D60270 0%, #D60270 25%, #9B4F96 50%, #0038A7 75%, #0038A7 100%)",
				lesbian:
					"linear-gradient(135deg, #D52D00 0%, #D52D00 20%, #FF9A56 20%, #FF9A56 40%, #FFFFFF 40%, #FFFFFF 60%, #D362A4 60%, #D362A4 80%, #A30262 80%, #A30262 100%)",
				nonbinary:
					"linear-gradient(135deg, #FFF430 0%, #FFF430 25%, #FFFFFF 25%, #FFFFFF 50%, #9C59D1 50%, #9C59D1 75%, #000000 75%, #000000 100%)",
				rainbow:
					"linear-gradient(135deg, #FF5F6D 0%, #FFC371 20%, #FFEB3B 40%, #4CAF50 60%, #2196F3 80%, #9C27B0 100%)",
				transgender:
					"linear-gradient(135deg, #55CDFC 0%, #55CDFC 20%, #F7A8B8 20%, #F7A8B8 40%, #FFF 40%, #FFF 60%, #F7A8B8 60%, #F7A8B8 80%, #55CDFC 80%, #55CDFC 100%)",
			},
		},
	},
};
