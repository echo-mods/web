<script setup lang="ts">
import { content } from '#tailwind-config';

const slideID = ref(0)

const props = defineProps({
    content: [String]
})

const data = computed(() => { if (props.content) { return props.content[slideID.value % content.length] } })

const incrementSlide = (value: number) => {
    console.log(`Incrementing slide by ${value}`)
    slideID.value += value
}
</script>

<template>
    <div class="content-container">
        <!-- Slidshow controls -->
        <div class="slideshow-controls">
            <button class="right" @click="incrementSlide(-1)">&lt;</button>
            <button class="left" @click="incrementSlide(1)">></button>
        </div>
        <!-- Content placeholders -->
        <img v-if="data && data.endsWith('mp4')" :src="data">
        <video v-else-if="data && data.endsWith('webp')" :src="data"></video>
        <iframe v-else :src="`https://www.youtube-nocookie.com/embed/${data}?modestbranding=true`"
            title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>
    </div>
</template>

<style scoped lang="scss">
.content-container {
    border-radius: 8px;
    width: 70%;
    aspect-ratio: 16 / 9;
    border: 1px rgba(255, 255, 255, 0.3) solid;
    overflow: hidden;
    > * {
        width: 100%;
        height: 100%;
    }
}
</style>