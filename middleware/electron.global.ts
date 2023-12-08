export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.server) return
    const ipc = !!window.ipcRenderer
    const { auth } = useSupabaseClient()
    watchEffect(async () => {
        if (ipc && !to.path.startsWith("/auth")) {
            const { data: { session: { refresh_token } } } = await auth.getSession()
            window.ipcRenderer.finish_auth(refresh_token)
        }
    });
});
