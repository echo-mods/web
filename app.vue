<script setup lang="ts">
import '@/assets/css/tailwind.css'

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

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;600;700;800&display=swap');
@font-face {
    font-family: Stalker;
    src: url(/StalkerFont.ttf);
}

html::-webkit-scrollbar {
    display: none;
}

body {
    margin: 0;
    background-color: rgb(10,10,10);;
    background-image: radial-gradient(rgba(255,255,255,0.2) 0.6px, rgba(0,0,0,0) 0.5px);
    background-size: 20px 20px;
    width: 100%;
}

.bg-gray-100, .bg-white {
    background: #171717 !important;
}

section {
    position: absolute;
    z-index: -100;
}

section h1,h2,h3,h4,h5,h6,p,span,img,button {
    color: white;
}

h1,h2,h3,h4,h5,h6,p,span,img,button {
    font-family: "Roboto", sans-serif;
}

#headlessui-menu-items-90 {
    z-index: 2;
}

.page-enter-active,
.page-leave-active,
.page-left-enter-active,
.page-left-leave-active,
.page-right-enter-active,
.page-right-leave-active {
  transition: all 0.3s ease-in-out;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: brightness(0.5) contrast(0.5);
}

.page-left-enter-from,
.page-right-leave-to {
  opacity: 0;
  transform: translateX(-10%);
}

.page-right-enter-from,
.page-left-leave-to {
  opacity: 0;
  transform: translateX(10%);
}

#file_upload {
    display: none;
}
</style>