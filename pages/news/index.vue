<script setup lang="ts">
definePageMeta({
    name: "News",
    ru_name: "Новости"
})


</script>

<template>
    <section id="news">
        <h1>{{ $t("news_title") }}</h1>
        <div class="spotlight">
            
        </div>
    </section>
</template>

<style scoped lang="scss">
#news {
    padding: 1rem;
    h1 {
        font-size: 2rem;
        font-weight: 700;
    }
}
</style>