export default defineNuxtRouteMiddleware(async (to, from) => {
    const ipc = useState<any>("ipc_g", () => null)
    const client = useSupabaseClient()
    const inElectron = computed(() => !!ipc.value)
    watchEffect(async () => {
        if (inElectron.value && !to.path.startsWith("/auth")) {
            const { data: { session: { refresh_token } } } = await client.auth.getSession()
            ipc.value.invoke("finish_auth", refresh_token)
        }
    });
});
