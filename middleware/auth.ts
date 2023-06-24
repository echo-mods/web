export default defineNuxtRouteMiddleware(async () => {
    const { api_endpoint } = useAppConfig();
    const SessionCookie = useCookie("SESSION_KEY");
    const { data } = await useFetch(`${api_endpoint}validate`, {
        query: {
            session: SessionCookie.value,
        },
    });
    if (!data.value || !data.value.valid) {
        return navigateTo("/login");
    }
});
