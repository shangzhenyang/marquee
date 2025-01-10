import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
	build: {
		target: "esnext",
	},
	plugins: [
		react(),
		VitePWA({
			manifest: {
				description:
					"Create full-screen scrolling text displays with customizable text, colors, font size, and speed. Perfect for concerts, events, announcements, and more.",
				icons: [
					{
						purpose: "any",
						sizes: "720x720",
						src: "https://www.shangzhenyang.com/images/avatar.png",
						type: "image/png",
					},
				],
				id: "/",
				name: "Marquee",
				short_name: "Marquee",
				theme_color: "#000000",
			},
			registerType: "autoUpdate",
		}),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
});
