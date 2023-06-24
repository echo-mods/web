<script setup lang="ts">
definePageMeta({
    name: 'Home',
    ru_name: 'Домашняя'
})
</script>

<template>
    <!-- Landing page -->
    <section id="hero-container">
        <h1>Echo Mods</h1>
        <hr>
        <h5>{{ $t('hero_subtitle') }}</h5>
    </section>
</template>

<style lang="scss">
#hero-container {
    margin: 0.75rem;
    width: calc(100% - 1.5rem);
    border-radius: 8px;
    outline: 1px rgba(255, 255, 255, 0.3) solid;
    box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.8);
    background: url('hero.webp');
    background-size: cover;
    background-position: center;
    height: calc(100vh - 6.25rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;

    h1 {
        font-size: 5rem;
        user-select: none;
        font-weight: 800;
    }

    hr {
        border: white 1px solid;
        width: 25rem;
        margin-bottom: 2rem;
    }

    h5 {
        font-weight: 100;
        user-select: none;
    }
}
</style>