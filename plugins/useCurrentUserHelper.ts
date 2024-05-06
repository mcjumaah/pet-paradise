import type { Cart } from "~/server/model/cart";
import type { CustomerProjection } from "~/server/projections/customerProjections";

export default defineNuxtPlugin(async () => {
	const route = useRoute();

	const { status, data: authData } = useAuth();

	const { data: customerData } = await useFetch("/api/customer", {
		method: "GET",
		query: { email: authData.value?.user?.email },
		transform: (_customerData: { data: CustomerProjection }) => _customerData.data,
	});

	const { data: cartData, execute } = await useFetch("/api/cart", {
		method: "GET",
		query: {
			customerId: customerData.value?.id,
		},
		immediate: false,
		transform: (_cartData: { data: Cart }) => _cartData.data,
	});

	const isAuthInitiated = ref(false);

	if (status.value === "authenticated") {
		isAuthInitiated.value = true;

		await execute();
	}

	return {
		provide: {
			currentUserHelper: () => {
				return {
					userData: customerData.value,
					cart: {
						data: cartData.value,
						fetch: execute,
					},
				};
			},
		},
	};
});
