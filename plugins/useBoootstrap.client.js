import { Dropdown } from "bootstrap";

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.mixin(Dropdown);
});
