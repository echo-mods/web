<script setup lang="ts">
definePageMeta({
    name: "News",
    ru_name: "Новости"
})

const { news: newsToDisplay } = useAppConfig()
const amountToDisplay = 5

interface newsContainer {
    spotlight: [{
        
    }] | undefined,
    other: undefined
}

const news = <newsContainer>reactive({
    spotlight: undefined,
    other: undefined
})
const { data: content } = await useAsyncData('home', () => queryContent('/news/test').findOne())

</script>

<template>
    <section id="news">
        <h1>{{ $t("news_title") }}</h1>
        <div class="spotlight">
            <div class="card"></div>
        </div>
        <div class="card small"></div>
    </section>
</template>

<style scoped lang="scss">
#news {
    padding: 1rem 15vw;
    h1 {
        font-size: 2rem;
        font-weight: 700;
    }
}
</style>