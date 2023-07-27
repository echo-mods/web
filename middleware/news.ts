export default defineNuxtRouteMiddleware(async (to, from) => {
    const { data } = await useAsyncData(to.path, () => queryContent(to.path).findOne())
    //if (!data.value) { return abortNavigation() }
});