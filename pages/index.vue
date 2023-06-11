<script setup lang="ts">
definePageMeta({
    name: 'Home',
    ru_name: 'Домашняя'
})
</script>

<template>
    <section id="hero-container">
        <h1>{{ $t("hello") }}</h1>
    </section>
</template>

<style scoped lang="scss">
#hero-container {
    margin: 0.75rem;
    border-radius: 8px;
    border: 1px rgba(255, 255, 255, 0.3) solid;
    box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.8);
    background: url('hero.webp');
    padding: 1rem;
    background-size: cover;
    background-position: center;
    height: calc(100vh - 6.25rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
        font-size: 4rem;
    }
}
</style>