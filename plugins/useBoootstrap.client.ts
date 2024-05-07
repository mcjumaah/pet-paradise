import { Dropdown, Collapse, Offcanvas, Tooltip, Alert, Toast } from "bootstrap";

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.mixin(Dropdown as any);
	nuxtApp.vueApp.mixin(Collapse as any);
	nuxtApp.vueApp.mixin(Offcanvas as any);
	nuxtApp.vueApp.mixin(Tooltip as any);
	nuxtApp.vueApp.mixin(Toast as any);
	nuxtApp.vueApp.mixin(Alert as any);

	return {
		provide: {
			Tooltip,
			Toast,
			Alert,
		},
	};
});
