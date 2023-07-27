<script setup lang="ts">
import { title } from 'process';

const { locale } = useI18n()
const route = useRoute()

const currentNewsArticleTitle = useState("newsArticleTitle", () => undefined)

watchEffect(() => {
    useHead({
        title: locale.value === "en" ? `${route.meta.name}` : `${route.meta.ru_name}`,
        titleTemplate: (titleChunk) => {
            if (titleChunk === "undefined" && currentNewsArticleTitle.value !== undefined) { return `${currentNewsArticleTitle.value} | EchoMods` }
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