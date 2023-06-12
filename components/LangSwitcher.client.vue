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

if (typeof localeCookie.value === "string") { locale.value = localeCookie.value }

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
    <UDropdown :items="lang_dropdown" :popper="{ placement: 'bottom-start', strategy: 'absolute' }">
        <UButton color="white" :label="locale === 'en' ? 'English' : 'Русский'" icon="i-heroicons-flag-solid">
            <template #leading>
                <Icon name="emojione:flag-for-russia" v-if="locale === 'ru'" />
                <Icon name="emojione:flag-for-united-states" v-else="locale === 'en'" />
            </template>
        </UButton>
    </UDropdown>
</template>