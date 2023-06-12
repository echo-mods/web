<script setup lang="ts">
const { locale, setLocale } = useI18n()

const lang_dropdown = ref([
    [{
        label: 'English',
        click: () => {},
        disabled: true
    }, {
        label: 'Русский',
        click: () => {},
        disabled: true
    }]
])

watchEffect(() => {
    if (locale.value === "en") {
        lang_dropdown.value = [
            [{
                label: 'Русский',
                click: () => {
                    setLocale("ru")
                },
                disabled: false
            }]
        ]
    } else {
        lang_dropdown.value = [
            [{
                label: 'English',
                click: () => {
                    setLocale("en")
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