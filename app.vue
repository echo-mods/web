<script setup lang="ts">
import "@/assets/css/tailwind.css";

const { locale } = useI18n();
const route = useRoute();

const { description } = useAppConfig();

useSeoMeta({
    description: description as string,
    ogTitle:
        locale.value === "en" ? `${route.meta.name}` : `${route.meta.ru_name}`,
    ogDescription: description as string,
    ogImage: "/banner.png",
    ogUrl: route.fullPath,
});

const currentNewsArticleTitle = useState("newsArticleTitle", () => undefined);

watchEffect(() => {
    useHeadSafe({
        htmlAttrs: {
            lang: locale.value,
        },
        title:
            locale.value === "en"
                ? `${route.meta.name}`
                : `${route.meta.ru_name}`,
        titleTemplate: (titleChunk) => {
            const defined =
                titleChunk !== "undefined" && titleChunk !== undefined;
            if (!defined && currentNewsArticleTitle.value !== undefined) {
                return `${currentNewsArticleTitle.value} | EchoMods`;
            }
            return defined ? `${titleChunk} | EchoMods` : "EchoMods";
        },
    });
});
const ipc = useState("ipc_g", () => undefined);

onMounted(async () => {
    try {
        const is_electron = !!(window as any).ipcRenderer;
        if (is_electron) ipc.value = is_electron;
        else ipc.value = undefined;
    } catch (err) {
        console.log(err);
        ipc.value = undefined;
    }
    document.documentElement.classList.add("dark");
});
</script>

<template>
    <NuxtLayout>
        <NuxtPage />
        <UNotifications />
    </NuxtLayout>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&family=Rubik+Vinyl&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;600;700;800&display=swap");

@font-face {
    font-family: Stalker;
    src: url(/StalkerFont.ttf);
}

:root {
    --index: calc(1vw * 1vh);
}

html::-webkit-scrollbar {
    display: none;
}

html {
    overflow-x: hidden;
}

body {
    margin: 0;
    background-color: rgb(10, 10, 10);
    background-image: radial-gradient(
        rgba(255, 255, 255, 0.2) 0.6px,
        rgba(0, 0, 0, 0) 0.5px
    );
    background-size: 20px 20px;
    width: 100%;
}

.bg-gray-100,
.bg-white {
    background: #171717 !important;
}

section h1,
h2,
h3,
h4,
h5,
h6,
p,
span,
img,
button {
    color: white;
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
span,
img,
button {
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
</style>
