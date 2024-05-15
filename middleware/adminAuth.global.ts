export default defineNuxtRouteMiddleware(async (to, from) => {
	const pathSections = to.path.split("/");
	const currentAdmin = useCurrentAdmin();

	if (pathSections[1] === "admin" && pathSections[2] !== "login" && !currentAdmin.value) {
		return navigateTo("/admin/login");
	}
});
