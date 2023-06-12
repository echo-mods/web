<script setup lang="ts">
const { api_endpoint } = useAppConfig()
const { locale } = useI18n()

const req = await useFetch(`${api_endpoint}mods`)
const cards = await req["data"].value

definePageMeta({
    name: 'Explore',
    ru_name: 'Моды'
})
</script>

<template>
    <!-- Page containing mods -->
    <section id="explore">
        <div class="card" v-for="data in cards" @click="navigateTo(`/mods/${data['id']}`)">
            <img :src="data['imageURL']" class="background">
            <h1>{{ data["name"] }}</h1>
        </div>
        <ClientOnly>
            <div class="done">
                <img v-if="locale === 'ru'" src="/done.png">
                <h1>{{ $t("done") }}</h1>
            </div>
        </ClientOnly>
    </section>
</template>

<style lang="scss">
#explore {
    margin: 0.75rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    z-index: -1;
}

.card {
    width: calc((100% - 2rem) / 3);
    aspect-ratio: 1.6;
    border-radius: 8px;
    border: 1px rgba(255, 255, 255, 0.3) solid;
    padding: 0 1rem;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    box-shadow: none;
    transition: all 0.3s ease-in-out;
    display: flex;
    flex-direction: column-reverse;
    padding: 2rem;
    .background {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: -1;
        object-fit: cover;
        object-position: center;
    }
    * {
        transition: all 0.3s ease-in-out;
    }
}

.card:hover {
    box-shadow: 0 -6rem 5rem rgba(0, 0, 0, 0.8) inset;
    h1 {
        font-size: 1.5rem;
    }
}

.done {
    user-select: none;
    width: 100%;
    text-align: center;
    margin: 1.5rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
        font-size: 2rem;
    }
    img {
        width: 15rem;
    }
}

@media (max-width: 600px) {
    .card {
        width: calc(100%);
        aspect-ratio: 1.2;
    }
}
</style>