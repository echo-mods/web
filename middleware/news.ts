export default defineNuxtRouteMiddleware(async (to, from) => {
    const { data } = await useAsyncData(to.path, () => queryContent(to.path).findOne())
    if (!data.value) { return abortNavigation() }
    const locale = useCookie("i18n_redirected")
    const opposite_lang = locale.value === "en" ? "ru" : "en"
    if (to.fullPath.startsWith(`/news/${opposite_lang}/`)) {
        const newPath = to.fullPath.replace(opposite_lang, locale.value || opposite_lang)
        return navigateTo(newPath)
    }
});