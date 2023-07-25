// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    css: ["assets/base.css"],
    modules: [
        "@nuxtjs/i18n",
        '@nuxthq/ui',
        'nuxt-icon',
        '@nuxt/content',
    ],
    routeRules: {
      "/": {prerender: true}
    },
    i18n: {
        strategy: "no_prefix",
        locales: ["ru", "en"], // used in URL path prefix
        defaultLocale: "ru", // default locale of your project for Nuxt pages and routings
        detectBrowserLanguage: {
          useCookie: true,
        }
    },
    colorMode: {
      preference: 'dark'
    }
});