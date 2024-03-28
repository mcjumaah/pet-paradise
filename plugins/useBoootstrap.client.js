import { Dropdown, Collapse, Offcanvas } from "bootstrap";

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.mixin(Dropdown);
	nuxtApp.vueApp.mixin(Collapse);
	nuxtApp.vueApp.mixin(Offcanvas);
});
