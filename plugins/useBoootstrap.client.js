import { Dropdown, Collapse, Offcanvas, Tooltip } from "bootstrap";

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.mixin(Dropdown);
	nuxtApp.vueApp.mixin(Collapse);
	nuxtApp.vueApp.mixin(Offcanvas);
	nuxtApp.vueApp.mixin(Tooltip);

	return {
		provide: {
			Tooltip,
		},
	};
});
