<script setup lang="ts">
definePageMeta({
    name: 'Home',
    ru_name: 'Домашняя'
})

const slides = [
    {
        background: "https://preview.redd.it/installed-expedition-anomaly-and-well-it-is-amazing-v0-txsos1h9led81.jpg?auto=webp&s=0139efedf5608924d8e03210fcab85ad979daf39",
        title: {
            data: "Expedition 2.3",
            type: "text"
        },
        subtitle: "Вышло обновление",
        content: "",
        image_filters: "brightness(0.4)",
        action: {
            text: "Скачать",
            onClick: () => {

            }
        },
        short_title: "Expedition",
        id: 0
    },
    {
        background: "https://i.ibb.co/Y7wHBnY/ASb-TBAb-VJss.jpg",
        title: {
            data: "Shadow Of Chernobyl Update",
            type: "text"
        },
        image_filters: "brightness(0.4)",
        subtitle: "Новые скриншоты с разработки",
        content: "Опубликованы новые скриншоты разрабатываемого мода «Shadow Of Chernobyl Update».",
        short_title: "SOC Update",
    },
    {
        background: "https://www.stalker2.com/_nuxt/img/assets/pages/game/the_danger/03.jpg",
        title: {
            data: "S.T.A.L.K.E.R. 2: Heart Of Chernobyl",
            type: "text"
        },
        subtitle: "Слит билд",
        content: "В сеть утек играбельный билд S.T.A.L.K.E.R. 2: Сердце Чернобыля. Новости о появлении билда в сети появились еще несколько дней назад, однако запустить и обойти систему защиты сборки удалось только сегодня.",
        short_title: "S.T.A.L.K.E.R. 2",
        action: {
            text: "Скачать",
            onClick: () => {
                console.log("Download")
            }
        }
    }
]
const currentIndex = ref(0)
const currentData = computed(() => {
    currentIndex.value = currentIndex.value % slides.length
    const gotObject = slides[currentIndex.value]
    gotObject.id = currentIndex.value
    return gotObject
})

let Timeout: NodeJS.Timeout | undefined

const setIndex = (index: number) => {
    currentIndex.value = index
    if (Timeout) { clearTimeout(Timeout); Timeout = undefined }
    Timeout = setTimeout(() => {
        setIndex(currentIndex.value + 1)
    }, 5200);
}

setIndex(0)

onMounted(() => {
    setIndex(0)
    setTimeout(() => {
        setIndex(1)
    }, 100);
});
</script>

<template>
    <section id="hero-container">
        <div class="hover-overlay"></div>
        <Transition name="image" mode="out-in">
            <img :style="{filter: currentData.image_filters}" :key="currentData.id" class="background" :src="currentData.background" :alt="currentData.short_title">
        </Transition>
        <Transition name="primary" mode="out-in">
            <img v-if="currentData.title.type === 'image'" :key="(currentData.id || 0) + 1" class="primary-image" :src="currentData.title.data" :style="{width: currentData.title.width}" />
        </Transition>
        <Transition name="primary" mode="out-in">
            <h1 v-if="currentData.title.type === 'text'" :key="currentData.id" class="title">{{ currentData.title.data }}</h1>
        </Transition>
        <Transition name="secondary" mode="out-in">
            <div :key="currentData.id" class="secondary-content">
                <h2 class="subtitle">{{ currentData.subtitle }}</h2>
                <p class="content">{{ currentData.content }}</p>
                <button v-if="currentData.action" class="action" @click="currentData.action.onClick">
                    {{ currentData.action.text }}
                </button>
            </div>
        </Transition>
        <div class="cards">
            <div class="card" v-for="(data, index) in slides" @click="setIndex(index)" :style="{height: `calc(${100 / slides.length}% - ${slides.length}rem)`}">
                <img class="background" :src="data.background" />
                <div class="overlay" :class="{current: index === currentIndex}"></div>
                <div class="data">
                    <p class="title">{{ data.short_title }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
#hero-container {
    margin: 0 5%;
    width: calc(90%);
    border-radius: 1rem;
    box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.8);
    background-size: cover;
    background-position: center;
    height: calc(45vh);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4rem;
    overflow: hidden;

    .cards {
        position: absolute;
        right: 5%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        .card {
            position: relative;
            user-select: none;
            background-color: rgb(0, 0, 0);
            border-radius: 8px;
            aspect-ratio: 2.5;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.8);
            overflow: hidden;
            .overlay {
                position: absolute;
                width: 0;
                height: 100%;
                left: 0;
                top: 0;
                border-radius: inherit;
                backdrop-filter: blur(0.1rem) brightness(0.4);
                transition-property: width, opacity;
                transition-duration: 0.3s, 0.3s;
                transition-timing-function: linear;
                opacity: 0;
            }
            .overlay.current {
                width: 100%;
                opacity: 1;
                transition-property: width, opacity;
                transition-duration: 5s, 0.3s;
                transition-timing-function: linear;
            }
            .background {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                object-fit: cover;
                border-radius: inherit;
                filter: brightness(0.6);
            }
            .data {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                z-index: 2;
                display: flex;
                justify-content: center;
                align-items: center;
                .title {
                    font-size: 1rem;
                    width: 100%;
                    flex-grow: 2;
                    text-align: center;
                    font-weight: 800;
                }
            }
        }
        .card:hover {
            transform: scale(1.1);
        }
    }

    > .background {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        object-fit: cover;
        z-index: -2;
        border-radius: inherit;
    }
    > .title {
        font-size: 2.5rem;
        max-width: calc(75% - 4rem);
        font-weight: 500;
        text-transform: uppercase;
        transition: margin-left 0.3s;
    }
    .subtitle {
        font-weight: 100;
        margin-top: 2rem;
        transition: margin-left 0.3s 0.1s;
    }
    .content {
        opacity: 0.5;
        transition: opacity 0.3s;
        transition: margin-left 0.3s 0.2s;
        max-width: 60%;
    }
    .action {
        margin-top: 2rem;
        background-color: white;
        color: black;
        border-radius: 8px;
        padding: 0.5rem 1rem;
        transition: all 0.3s;
        outline: rgba(255, 255, 255, 0) 2px solid;
        transition: margin-left 0.3s 0.3s;
    }
    .action:hover {
        color: white;
        background: none;
        outline: rgba(255, 255, 255, 0.5) 2px solid;
    }
    > .hover-overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        object-fit: cover;
        z-index: -1;
        border-radius: inherit;
        transition: all 0.3s;
    }
    &:hover {
        .content {
            opacity: 1;
            margin-left: 1rem;
        }
        > .title {
            margin-left: 1rem;
        }
        
        .subtitle {
            margin-left: 1rem;
        }
        .action {
            margin-left: 1rem;
        }
        > .hover-overlay {
            backdrop-filter: brightness(0.5);
        }
    }
}

/* PRIMARY */
.primary-enter-active,
.primary-leave-active {
  transition: all 0.3s 0.1s;
}

.primary-enter-from {
  transform: translateX(150px);
  opacity: 0;
}

.primary-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}

/* SECONDARY */
.secondary-enter-active,
.secondary-leave-active {
  transition: all 0.2s 0.1s;
}

.secondary-enter-from {
  transform: translateX(30px);
  opacity: 0;
}

.secondary-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}

/* IMAGE */
.image-enter-active,
.image-leave-active {
  transition: all 0.2s;
}

.image-enter-from {
  transform: translateX(30px);
  opacity: 0;
}

.image-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}
</style>