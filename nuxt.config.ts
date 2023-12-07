// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	css: ["~/assets/css/tailwind.css"],
	devtools: { enabled: true },
	modules: [
		"@nuxtjs/mdc",
		"@nuxtjs/robots",
		"@nuxtjs/i18n",
		"@nuxt/ui",
		"nuxt-icon",
		"@nuxt/content",
		"nuxt-gtag",
		"@nuxtjs/supabase",
	],
	routeRules: {
		"/mods": {
			redirect: "/explore"
		},
		"/auth/*": {
			cors: true
		},
	},
	mdc: {
		headings: {
			anchorLinks: {
				h1: false,
				h2: false,
				h3: false,
				h4: false,
				h5: false,
				h6: false,
			}
		}
	},
	supabase: {
		redirect: false
	},
	app: {
		pageTransition: { name: "page", mode: "out-in" },
	},
	i18n: {
		vueI18n: 'i18n.config.ts',
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
	vue: {
		compilerOptions: {
			isCustomElement: (tag) => ["carousel"].includes(tag),
		},
	},
});
