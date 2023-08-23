<script setup lang="ts">
const { locale, setLocale } = useI18n()

const route = useRoute()

const isRussian = ref(locale.value === "ru")

const animating: Ref<boolean> = useState("translation-animating")

const animateLocale = (locale: "en" | "ru") => {
    if (!(route.path.startsWith(`/news/${locale}`) || route.path.startsWith(`/news/${locale}`))) {
        animating.value = true
        setTimeout(() => {
            setLocale(locale)
        }, 500);
    } else {
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
    }, 10);
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