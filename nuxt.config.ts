// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ["~/assets/css/tailwind.css"],
    devtools: { enabled: true },
    modules: [
        "@nuxtjs/robots",
        "@nuxtjs/i18n",
        "@nuxthq/ui",
        "nuxt-icon",
        "@nuxt/content",
        "nuxt-gtag",
    ],
    routeRules: {
        "/": { prerender: true },
    },
    app: {
        pageTransition: { name: "page", mode: "out-in" },
    },
    i18n: {
        strategy: "no_prefix",
        locales: ["ru", "en"], // used in URL path prefix
        defaultLocale: "ru", // default locale of your project for Nuxt pages and routings
        detectBrowserLanguage: {
            useCookie: true,
        },
    },
    gtag: {
        id: "G-ZZRS317TRT",
    },
    colorMode: {
        preference: "dark",
    },
    experimental: {
        componentIslands: true,
    },
    vue: {
        compilerOptions: {
            isCustomElement: (tag) => ["carousel"].includes(tag),
        },
    },
});
