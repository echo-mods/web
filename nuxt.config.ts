// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    css: ["assets/base.css"],
    modules: [
        "@nuxtjs/i18n",
        '@nuxthq/ui',
        'nuxt-icon'
    ],
    i18n: {
        strategy: "no_prefix",
        locales: ["en", "ru"], // used in URL path prefix
        defaultLocale: "en", // default locale of your project for Nuxt pages and routings
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_redirected',
          redirectOn: 'root',  // recommended
        }
    },
});