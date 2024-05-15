import type { Admin } from "~/server/model/admin";

export const useCurrentAdmin = () => {
	return useCookie<Admin>("current-admin");
};
