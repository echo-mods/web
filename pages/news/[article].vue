<script setup lang="ts">
definePageMeta({
    middleware: "news"
})
</script>

<template>
    <section id="news-article">
        <ContentDoc />
    </section>
</template>

<style lang="scss">

#news-article {
    padding: 1rem;
    width: 70%;
    margin: 1rem 15%;
    background-color: rgba(255,255,255,0.02);
    backdrop-filter: blur(1px);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    h1 {
        font-size: 2rem;
        font-weight: 600;
        margin: 1.5rem 0;
    }
    h2 {
        font-size: 1.4rem;
        font-weight: 400;
        margin: 1rem 0;
    }
    h3 {
        font-size: 1.1rem;
        font-weight: 300;
        margin: 0.75rem 0;
    }
    h4 {
        font-size: 0.9rem;
        font-weight: 200;
        margin: 0.5rem 0;
    }
    h5, h6 {
        font-size: 0.7rem;
        font-weight: 100;
        margin: 0.5rem 0;
    }
}

@media (max-width: 600px) {
    #news-article {
        width: calc(100% - 2rem);
        margin: 1rem;
    }
}
</style>