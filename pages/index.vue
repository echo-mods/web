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
            text: "Подробнее",
            onClick: () => {

            }
        },
        id: 0
    },
    {
        background: "https://i.ibb.co/Y7wHBnY/ASb-TBAb-VJss.jpg",
        title: {
            data: "Shadow Of Chernobyl Update",
            type: "text"
        },
        subtitle: "Новые скриншоты с разработки",
        content: "Опубликованы новые скриншоты разрабатываемого мода «Shadow Of Chernobyl Update».",
        action: {
            text: "Подробнее",
            onClick: () => {
                console.log("Bruh")
            }
        },
        id: 0
    }
]
const currentIndex = ref(0)
const currentData = computed(() => {
    currentIndex.value = currentIndex.value % slides.length
    const gotObject = slides[currentIndex.value]
    gotObject.id = currentIndex.value
    return gotObject
})
</script>

<template>
    <button @click="currentIndex++">Test</button>
    <section id="hero-container">
        <Transition name="image" mode="out-in">
            <img :style="{filter: currentData.image_filters}" :key="currentData.id" class="background" :src="currentData.background" :alt="currentData.title">
        </Transition>
        <Transition name="primary" mode="out-in">
            <h1 v-if="currentData.title.type === 'text'" :key="currentData.id" class="title">{{ currentData.title.data }}</h1>
        </Transition>
        <Transition name="primary" mode="out-in">
            <img v-if="currentData.title.type === 'image'" :key="currentData.id + 1" class="primary-image" :src="currentData.title.data" />
        </Transition>
        <Transition name="secondary" mode="out-in">
            <div :key="currentData.id" class="secondary-content">
                <h2 class="subtitle">{{ currentData.subtitle }}</h2>
                <p class="content">{{ currentData.content }}</p>
                <button class="action" @click="currentData.action.onClick">
                    {{ currentData.action.text }}
                </button>
            </div>
        </Transition>
    </section>
</template>

<style lang="scss">
#hero-container {
    margin: 0 5%;
    width: calc(90%);
    border-radius: 8px;
    outline: 1px rgba(255, 255, 255, 0.3) solid;
    box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.8);
    background-size: cover;
    background-position: center;
    height: calc(45vh);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4rem;
    overflow: hidden;

    .background {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        object-fit: cover;
        filter: brightness(0.5);
        z-index: -1;
    }
    .title {
        font-size: 2.5rem;
        max-width: calc(75% - 4rem);
        font-weight: 500;
        text-transform: uppercase;
    }
    .subtitle {
        font-weight: 100;
        margin-top: 2rem;
    }
    .action {
        margin-top: 2rem;
        background-color: white;
        color: black;
        border-radius: 8px;
        padding: 0.5rem 1rem;
        transition: all 0.3s;
        outline: rgba(255, 255, 255, 0) 2px solid;
    }
    .action:hover {
        color: white;
        background: none;
        outline: rgba(255, 255, 255, 0.5) 2px solid;
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