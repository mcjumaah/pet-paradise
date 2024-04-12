// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: {
		enabled: false,

		timeline: {
			enabled: false,
		},
	},
	modules: ["@sidebase/nuxt-auth"],
	auth: { globalAppMiddleware: true, provider: { type: "authjs" } },
	css: ["~/assets/styles/main.scss"],
});
