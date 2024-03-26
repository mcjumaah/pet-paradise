// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: {
		enabled: false,

		timeline: {
			enabled: false,
		},
	},
	css: ["~/assets/styles/main.scss"],
	plugins: ["~/plugins/useBoootstrap.client.js", "~/plugins/useVueDatePicker.ts"],
});
