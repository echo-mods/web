export default defineNuxtRouteMiddleware(async (to, from) => {
	const user = useSupabaseUser()
    if (!user.value) {
        return navigateTo({path: "/auth/login", query: {redirect_to: to.fullPath}});
    }
});