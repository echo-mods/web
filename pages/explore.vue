<script setup lang="ts">
const { api_endpoint } = useAppConfig()
const { locale } = useI18n()

/*
const { pending, data: cards } = await useFetch(`${api_endpoint}mods`, {
    lazy: true
})
*/

const cards = ref()

const pending = ref(true)

setTimeout(() => {
    pending.value = false
    cards.value = [
        {
            "name": "Инкубатор",
            "description": "В модификации представлена новая история со средней продолжительностью, наполненная кат-сценами с озвучкой персонажей, а также с интригами, мистикой и перестрелками. Новый проект не будет связан с прошлыми работами командами («Контракт На Хорошую Жизнь», «Контракт На Новую Жизнь»), но отсылки и встреча со знакомыми персонажами точно гарантирована.",
            "rating": 5.0,
            "imageURL": "https://i.ibb.co/GnNDDpG/awr1-Sz-U7m80.jpg",
            "logoURL": "",
            "socialLink": "",
            "content": [
                "iRbeC_BbMqM",
                "https://i.ibb.co/L8L21Zt/b-Elye-Qe-ENw.jpg",
                "https://i.ibb.co/ckLXnSx/f-Zni-PLy-Gmdk.jpg",
                "https://i.ibb.co/H4ShXbT/lfrc-Sx-IJI5g.jpg",
                "https://i.ibb.co/r4xKWhJ/P5cc-O626-LGk.jpg"
            ],
            "platform": "Зов припяти",
            "downloadURL": "http://ipv4.download.thinkbroadband.com/512MB.zip",
            "archive_type": "zip",
            "standalone": true,
            "game_required": "soc"
        }
    ]
}, 1000);

definePageMeta({
    name: 'Explore',
    ru_name: 'Моды'
})
</script>

<template>
    <!-- Page containing mods -->
    <TransitionGroup name="fade" mode="in-out">
        <div v-if="pending" class="placeholder-container">
            <div class="card-placeholder">
                <USkeleton class="w-[100%] h-4" />
                <USkeleton class="w-[30%] h-5" />
                <USkeleton class="w-[50%] h-7" />
            </div>
            <div class="card-placeholder">
                <USkeleton class="w-[100%] h-4" />
                <USkeleton class="w-[30%] h-5" />
                <USkeleton class="w-[50%] h-7" />
            </div>
            <div class="card-placeholder">
                <USkeleton class="w-[100%] h-4" />
                <USkeleton class="w-[30%] h-5" />
                <USkeleton class="w-[50%] h-7" />
            </div>
        </div>
        <section id="explore" v-else>
            <NuxtLink class="card" tag="div" v-for="(data, index) in cards" :to="`/mods/${data['id']}`">
                <img v-once :src="data['imageURL']" class="background">
                <div class="info-container">
                    <span v-once>
                        <Icon
                            name="streamline:interface-favorite-star-reward-rating-rate-social-star-media-favorite-like-stars" />
                        {{ data["rating"] }} / 10
                    </span>
                    <UPopover mode="hover" :popper="{ 'strategy': 'absolute' }">
                        <h2>{{ data["description"] }}</h2>
                        <template #panel>
                            <p v-once style="margin: 1rem; text-align: center;">{{ data["description"] }}</p>
                        </template>
                    </UPopover>
                </div>
                <h1>{{ data["name"] }}</h1>
            </NuxtLink>
            <ClientOnly>
                <div class="done">
                    <img v-if="locale === 'ru'" src="/done.png">
                    <h1>{{ $t("done") }}</h1>
                </div>
            </ClientOnly>
        </section>
    </TransitionGroup>
</template>

<style scoped lang="scss">
#explore {
    margin: 0.75rem;
    width: calc(100% - 1.5rem);
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    z-index: -5;
}

.placeholder-container {
    margin: 1.5rem 0.75rem;
    width: calc(100% - 1.5rem);
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.card-placeholder {
    width: calc((100% - 2rem) / 3);
    border: 1px rgba(255, 255, 255, 0.15) solid;
    backdrop-filter: blur(1px);
    aspect-ratio: 1.6;
    border-radius: 8px;
    display: flex;
    flex-direction: column-reverse;
    padding: 1.2rem;
    gap: 5px;
}

.card {
    border: 1px rgba(255, 255, 255, 0.3) solid;
    width: calc((100% - 2rem) / 3);
    aspect-ratio: 1.6;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    box-shadow: none;
    transition: all 0.3s ease-in-out;
    display: flex;
    flex-direction: column-reverse;
    padding: 1.2rem;

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

    h1 {
        font-size: 1.5rem;
    }

    .info-container {
        height: 0;
        opacity: 0;
    }

    h2 {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    * {
        transition: all 0.3s ease-in-out;
    }
}

.card:hover {
    box-shadow: 0 -6rem 5rem rgba(0, 0, 0, 0.8) inset;

    .info-container {
        height: 3rem;
        opacity: 1;
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
        font-weight: 100;
    }

    img {
        width: 15rem;
    }
}

.fade-move, /* apply transition to moving elements */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  filter: blur(0.4rem);
}

.fade-leave-active {
  position: absolute;
}

@media (max-width: 600px) {
    .card,
    .card-placeholder {
        width: calc(100%);
        aspect-ratio: 1.2;
    }
}
</style>