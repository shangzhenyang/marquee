import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					if (id.includes("framer-motion")) {
						return "framer-motion";
					}
					if (id.includes("nextui")) {
						return "nextui";
					}
					if (id.includes("node_modules")) {
						return "vendors";
					}
					if (id.includes("translations")) {
						return "translations";
					}
				},
			},
		},
		target: "esnext",
	},
	plugins: [
		react(),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
});
