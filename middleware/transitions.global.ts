export default defineNuxtRouteMiddleware(async (to, from) => {
    const startX = from.meta.horizonal_id;
    const endX = to.meta.horizonal_id;
    let result = "page";
    if (startX && endX) {
        if (startX < endX) {
            result = "page-right";
        } else if (startX > endX) {
            result = "page-left";
        }
    }
    to.meta.pageTransition = {
        name: result,
        mode: "out-in",
    };
    from.meta.pageTransition = {
        name: result,
        mode: "out-in",
    };
});
