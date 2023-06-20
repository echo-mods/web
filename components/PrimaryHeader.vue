<script setup lang="ts">
const { locale } = useI18n()
const route = useRoute()

const links = [
    {
        text: "Home",
        ru_text: "Домашняя",
        route: "/"
    },
    {
        text: "Explore",
        ru_text: "Моды",
        route: "/explore"
    }
]
</script>

<template>
    <header>
        <NuxtLink to="/">
            <img src="/favicon.ico" alt="Logo">
        </NuxtLink>
        <div class="links">
            <NuxtLink v-for="link in links" :to="link.route">
                <span :class="{ current: route.fullPath === link.route }">{{ locale === "en" ? link.text : link.ru_text }}</span>
            </NuxtLink>
        </div>
        <LangSwitcher />
    </header>
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

.links {
    display: flex;
    gap: 1rem;
}
.links span {
    font-weight: 300;
    opacity: 0.75;
    transition: all 0.5s;
}
.links span.current {
    opacity: 1;
}
</style>