// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: {
		enabled: false,

		timeline: {
			enabled: false,
		},
	},
	modules: ["@sidebase/nuxt-auth", "nuxt-lodash"],
	auth: { globalAppMiddleware: true, provider: { type: "authjs" } },
	lodash: {
		prefix: "_",
	},
	css: ["~/assets/styles/main.scss"],
});
