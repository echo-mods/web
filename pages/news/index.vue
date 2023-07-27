<script setup lang="ts">
definePageMeta({
    name: "News",
    ru_name: "Новости"
})

const { news, spotlight_news } = useAppConfig()
const amountToDisplay = 6
const page = ref(1)

const { query } = useRoute()
if (query.hasOwnProperty("page") && typeof query["page"] === "string") {
    page.value = parseInt(query["page"])
}

interface newsElement {
    image: any,
    title: string | undefined,
    subtitle: any,
    article_url: string,
    id: number
}

interface newsContainer {
    spotlight: newsElement[],
    other: newsElement[]
}

const newsReactive = <newsContainer>reactive({
    spotlight: [],
    other: []
})

const getSpotlightNews = async () => {
    newsReactive.spotlight = []
    for (let i = 0; i < spotlight_news.length; i++) {
        if (Object.prototype.hasOwnProperty.call(spotlight_news, i)) {
            const path = spotlight_news[i];
            const { data: content } = await useAsyncData(path, () => queryContent(`/news/${path}`).findOne())
            if (content.value) {
                const output = {
                    image: content.value["homepage_image"],
                    title: content.value["title"],
                    subtitle: content.value["homepage_subtitle"],
                    article_url: `/news/${path}`,
                    id: i
                }
                if (newsReactive.spotlight.length < i + 1) {
                    newsReactive.spotlight.push(output)
                }
            }
        }
    }
}

const refreshNews = async () => {
    newsReactive.other = []
    for (let i = (page.value - 1) * amountToDisplay; i < page.value * amountToDisplay && i < news.length; i++) {
        if (Object.prototype.hasOwnProperty.call(news, i)) {
            const path = news[i];
            const { data: content } = await useAsyncData(path, () => queryContent(`/news/${path}`).findOne())
            if (content.value) {
                const output = {
                    image: content.value["homepage_image"],
                    title: content.value["title"],
                    subtitle: content.value["homepage_subtitle"],
                    article_url: `/news/${path}`,
                    id: i
                }
                if (newsReactive.other.length < i + 1) {
                    newsReactive.other.push(output)
                }
            }
        }
    }
}

// Get data
onMounted(getSpotlightNews)
watchEffect(refreshNews)
getSpotlightNews()
</script>

<template>
    <section id="news">
        <h1>{{ $t("news_title") }}</h1>
        <ClientOnly>
            <div class="spotlight">
                <div class="card" v-for="article in newsReactive.spotlight">
                    <NuxtLink :to="article.article_url">
                        <img :src="article.image" alt="Article image">
                    </NuxtLink>
                    <NuxtLink :to="article.article_url">
                        <h3 class="title">{{ article.title }}</h3>
                    </NuxtLink>
                    <p class="subtitle">{{ article.subtitle }}</p>
                </div>
            </div>
            <hr>
            <div class="grid">
                <div class="card small" v-for="article in newsReactive.other">
                    <NuxtLink :to="article.article_url">
                        <img :src="article.image" alt="Article image">
                    </NuxtLink>
                    <NuxtLink :to="article.article_url">
                        <h3 class="title">{{ article.title }}</h3>
                    </NuxtLink>
                    <p class="subtitle">{{ article.subtitle }}</p>
                </div>
            </div>
            <UPagination v-model="page" :page-count="amountToDisplay" :total="news.length"></UPagination>
            <template #fallback>
                <div class="spotlight">
                    <div class="card">
                        <USkeleton class="skeleton-image" />
                        <USkeleton class="skeleton-title" />
                        <USkeleton class="skeleton-subtitle" />
                    </div>
                    <div class="card">
                        <USkeleton class="skeleton-image" />
                        <USkeleton class="skeleton-title" />
                        <USkeleton class="skeleton-subtitle" />
                    </div>
                </div>
                <hr>
                <div class="grid">
                    <div class="card small">
                        <USkeleton class="skeleton-image" />
                        <USkeleton class="skeleton-title" />
                        <USkeleton class="skeleton-subtitle" />
                    </div>
                    <div class="card small">
                        <USkeleton class="skeleton-image" />
                        <USkeleton class="skeleton-title" />
                        <USkeleton class="skeleton-subtitle" />
                    </div>
                    <div class="card small">
                        <USkeleton class="skeleton-image" />
                        <USkeleton class="skeleton-title" />
                        <USkeleton class="skeleton-subtitle" />
                    </div>
                </div>
            </template>
        </ClientOnly>
    </section>
</template>

<style scoped lang="scss">
#news {
    padding: 1rem 15vw;
    width: 100vw;
    > h1 {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 1rem;
    }
}

.spotlight {
    display: flex;
    gap: 1rem;
}

.grid {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
}

hr {
    margin: 2rem 1rem;
    opacity: 0.2;
}

.card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: calc((100% - 1rem) / 2);
    img, .skeleton-image {
        width: 100%;
        aspect-ratio: 16 / 9 !important;
        border-radius: 0.5rem;
    }
    .title {
        font-weight: 700;
        font-size: 1.3rem;
        max-width: 100%;
    }
    > .subtitle {
        font-weight: 300;
        font-size: 0.9rem;
        max-width: 100%;
    }
    .skeleton-title {
        width: 50%;
        height: 1.6rem;
    }
    .skeleton-subtitle {
        width: 80%;
        height: 1rem;
    }
    &.small {
        width: calc((100% - 2rem) / 3);
    }
}
</style>