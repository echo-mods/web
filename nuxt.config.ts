// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    css: ["assets/base.css"],
    modules: [
        "@nuxtjs/i18n",
        '@nuxthq/ui',
        'nuxt-icon'
    ],
    app: {
      pageTransition: { name: 'page', mode: 'out-in' }
    },
    i18n: {
        strategy: "no_prefix",
        locales: ["en", "ru"], // used in URL path prefix
        defaultLocale: "en", // default locale of your project for Nuxt pages and routings
        detectBrowserLanguage: {
          useCookie: true,
          alwaysRedirect: true
        }
    },
});