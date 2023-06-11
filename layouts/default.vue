<script setup lang="ts">
const { locale, setLocale } = useI18n()
const localeCookie = useCookie("locale")

const lang_dropdown = ref([
    [{
        label: 'English',
        click: () => {
            setLocale("en")
        },
        disabled: true
    }, {
        label: 'Русский',
        click: () => {
            setLocale("ru")
        },
        disabled: true
    }]
])

locale.value = localeCookie.value

watchEffect(() => {
    localeCookie.value = locale.value
    if (locale.value === "en") {
        lang_dropdown.value = [
            [{
                label: 'Русский',
                click: () => {
                    locale.value = "ru"
                },
                disabled: false
            }]
        ]
    } else {
        lang_dropdown.value = [
            [{
                label: 'English',
                click: () => {
                    locale.value = "en"
                },
                disabled: false
            }]
        ]
    }
})

</script>

<template>
    <header>
        <img src="favicon.ico" alt="">
        <UDropdown :items="lang_dropdown" :popper="{ placement: 'bottom-start', strategy: 'absolute' }">
            <UButton color="white" :label="locale === 'en' ? 'English' : 'Русский'" icon="i-heroicons-flag-solid">
                <template #leading>
                    <ClientOnly>
                        <Icon name="emojione:flag-for-russia" v-if="locale === 'ru'" />
                        <Icon name="emojione:flag-for-united-states" v-else="locale === 'en'" />
                    </ClientOnly>
                </template>
            </UButton>
        </UDropdown>
    </header>
    <slot />
</template>

<style scoped>
header {
    height: 4rem;
    margin: 0.75rem;
    background-color: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(1px);
    border-radius: 8px;
    border: 1px rgba(255, 255, 255, 0.3) solid;
    box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.8);
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>