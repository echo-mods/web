<script setup lang="ts">
const { locale: locale_g, setLocale } = useI18n()

const route = useRoute()

const isRussian = ref(locale_g.value !== "en")

const animating: Ref<boolean> = useState("translation-animating")
const animating_to_lang: Ref<string> = useState("translation-animating-target")

const animateLocale = (locale: "en" | "ru") => {
    animating_to_lang.value = locale
    if (!route.path.startsWith(`/news/${locale_g.value}`)) {
        animating.value = true
        setTimeout(() => {
            setLocale(locale)
            locale_g.value = locale
        }, 500);
    } else {
        animating.value = true
        setLocale(locale)
    }
}

const update = () => {
    setTimeout(() => {
        if (isRussian.value) {
            animateLocale("ru")
        } else {
            animateLocale("en")
        }
    }, 100);
}

</script>

<template>
    <ClientOnly>
        <div class="switcher">
            <Icon name="emojione:flag-for-united-states" />
            <UToggle @click="update" :disabled="animating" v-model="isRussian" :ui='{ "inactive": "bg-{color}-500 dark:bg-{color}-400" }' />
            <Icon name="emojione:flag-for-russia" />
        </div>
        <template #fallback>
            <Icon name="emojione:flag-for-united-states" />
            <button class="relative inline-flex h-5 w-9 flex-shrink-0 border-2 border-transparent disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none rounded-full focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"></button>
            <Icon name="emojione:flag-for-russia" />
        </template>
    </ClientOnly>
</template>

<style scoped lang="scss">
.switcher {
    display: flex;
    align-items: center;
    gap: 1rem;
}
</style>