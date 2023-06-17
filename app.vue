<script setup lang="ts">
const { locale } = useI18n()
const route = useRoute()

watchEffect(() => {
    useHead({
        title: locale.value === "en" ? `${route.meta.name}` : `${route.meta.ru_name}`,
        titleTemplate: (titleChunk) => {
            return titleChunk ? `${titleChunk} | EchoMods` : 'EchoMods';
        }
    })
})
</script>

<template>
    <NuxtLayout>
        <NuxtPage />
        <UNotifications />
    </NuxtLayout>
</template>