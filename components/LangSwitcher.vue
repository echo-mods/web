<script setup lang="ts">
const { locale, setLocale } = useI18n()

const route = useRoute()

const lang_dropdown = ref([
    [{
        label: 'English',
        click: () => { },
        disabled: true
    }, {
        label: 'Русский',
        click: () => { },
        disabled: true
    }]
])

const animating: Ref<boolean> = useState("translation-animating")

watchEffect(() => {
    if (locale.value === "en") {
        lang_dropdown.value = [
            [{
                label: 'Русский',
                click: () => {
                    if (!(route.path.startsWith('/news/ru') || route.path.startsWith('/news/en'))) {
                        animating.value = true
                        setTimeout(() => {
                            setLocale("ru")
                        }, 500);
                    } else {
                        setLocale("ru")
                    }
                },
                disabled: false
            }]
        ]
    } else {
        lang_dropdown.value = [
            [{
                label: 'English',
                click: () => {
                    if (!(route.path.startsWith('/news/ru') || route.path.startsWith('/news/en'))) {
                        animating.value = true
                        setTimeout(() => {
                            setLocale("en")
                        }, 500);
                    } else {
                        setLocale("en")
                    }
                },
                disabled: false
            }]
        ]
    }
})

</script>

<template>
    <ClientOnly>
        <UDropdown :items="lang_dropdown" :popper="{ placement: 'bottom-start', strategy: 'absolute' }" :disabled="animating">
            <UButton class="selector-button" color="white" :label="locale === 'en' ? 'English' : 'Русский'" :disabled="animating">
                <template #leading>
                    <Icon name="emojione:flag-for-russia" v-if="locale === 'ru'" />
                    <Icon name="emojione:flag-for-united-states" v-else="locale === 'en'" />
                </template>
            </UButton>
        </UDropdown>
        <template #fallback>
            <UButton color="white" class="fallback-button">
                <Icon class="loader" name="svg-spinners:6-dots-rotate"/>
            </UButton>
        </template>
    </ClientOnly>
</template>

<style scoped lang="scss">
.selector-button,
.fallback-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 95px;
    height: 32px;

    > .loader {
        opacity: 0.8;
        transform: scale(1.1);
    }
}
</style>