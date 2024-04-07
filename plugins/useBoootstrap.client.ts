import { Dropdown, Collapse, Offcanvas, Tooltip } from "bootstrap";

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.mixin(Dropdown as any);
	nuxtApp.vueApp.mixin(Collapse as any);
	nuxtApp.vueApp.mixin(Offcanvas as any);
	nuxtApp.vueApp.mixin(Tooltip as any);

	return {
		provide: {
			Tooltip,
		},
	};
});
