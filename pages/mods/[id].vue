<script setup lang="ts">
definePageMeta({
    validate: async (route) => {
        const { api_endpoint } = useAppConfig()
        const { data } = await useFetch(`${api_endpoint}mods/${route.params.id}`)

        return data.value !== null && data.value !== undefined
    }
})
// Page setup finished
const route = useRoute()
const { api_endpoint } = useAppConfig()
const { data } = await useFetch(`${api_endpoint}mods/${route.params.id}`)

useHead({
  title: data.value.name,
  titleTemplate: '%s | EchoMods',
})
</script>

<template>
    <section id="mod-details">
        <ContentSlideshow :content="data.content" />
        <div class="data-container">
            <a :href="data.socialLink">
                <img class="logo" :src="data.logoURL" alt="IMG tag">
            </a>
            <img class="background" :src="data.imageURL">
            <h1 v-once>{{ data.name }}</h1>
            <hr>
            <p v-once>{{ data.description }}</p>
            <hr>
            <p>
                <Icon name="streamline:interface-favorite-star-reward-rating-rate-social-star-media-favorite-like-stars" />
                <span>{{ data.rating }} / 10</span>
            </p>
            <p>
                <Icon name="iconoir:radiation" />
                <span>{{ data.platform }}</span>
            </p>
            <p v-if="data.standalone === false">
                <Icon name="mdi:exclamation" />
                <span>{{ $t("req_true") }}</span>
            </p>
            <p v-else>
                <Icon name="carbon:thumbs-up" />
                <span>{{ $t("req_false") }}</span>
            </p>
            <a name="torrent-link" :href="data.downloadURL" target="_blank">
                <button v-if="data.downloadURL.startsWith('magnet:')">
                    <div>
                        <Icon name="fluent-emoji-flat:magnet" />
                        <span>{{ $t("download_torrent") }}</span>
                    </div>
                </button>
            </a>
        </div>
    </section>
</template>

<style lang="scss">
#mod-details {
    margin: 0.75rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.data-container {
    border-radius: 8px;
    border: 1px rgba(255, 255, 255, 0.3) solid;
    width: calc(30% - 1rem);
    padding: 1rem;
    position: relative;
    overflow: hidden;

    h1 {
        width: 100%;
        text-align: center;
        font-size: 2rem;
        font-weight: 600;
    }

    p {
        font-weight: 200;
    }

    hr {
        margin: 0.5rem 0;
        opacity: 0.5;
    }

    span {
        margin-left: 0.5rem;
    }
    
    .logo {
        width: 5rem;
        aspect-ratio: 1;
    }

    .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.3;
        filter: blur(0.5rem);
        object-fit: cover;
        object-position: center;
    }

    button {
        font-weight: 100;
        transition: all 0.3s;
        border-radius: 8px;
        padding: 1px;
        margin-top: 1rem;
        div {
            padding: 0.5rem 1.5rem;
            background-color: rgb(10, 10, 10);
            border-radius: 8px;
            transition: all 0.3s;
        }

        background: linear-gradient(55deg, rgba(30, 255, 0, 1) 0%, rgba(0, 212, 255, 1) 100%);
    }

    button:hover {
        background: linear-gradient(-30deg, rgba(30, 255, 0, 1) 0%, rgba(0, 212, 255, 1) 100%);
    }
}

@media (max-width: 600px) {
    .data-container {
        width: 100%;
    }
}
</style>