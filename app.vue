<script setup lang="ts">
const { locale } = useI18n()
const route = useRoute()
</script>

<template>
    <title>{{ locale === "en" ? `${route.meta.name} | EchoMods` : `${route.meta.ru_name} | EchoMods` }}</title>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>