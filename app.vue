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
    <input type="file" id="file_upload" />
    <NuxtLayout>
        <NuxtPage />
        <UNotifications />
    </NuxtLayout>
</template>

<style scoped>
#file_upload {
    display: none;
}
</style>