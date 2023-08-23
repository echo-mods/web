<script setup lang="ts">
definePageMeta({
    name: "Roadmap",
    ru_name: "Планы",
    horizonal_id: 3
})

const container = ref()
const scroll = reactive({
    percentage: 0,
    px: 0
})

onMounted(() => {
    container.value.addEventListener("scroll", () => {
        scroll.px = container.value.scrollTop
        scroll.percentage = Math.round(container.value.scrollTop / (container.value.scrollHeight - container.value.offsetHeight) * 100)
    })
})

interface step {
    icon?: string,
    title: string,
    date?: string
}

const steps: step[] = [
    {
        title: "Hello",
        icon: "material-symbols:waving-hand-sharp",
        date: "September 1, 2023"
    },
    {
        title: "Goodbye",
        icon: "material-symbols:directions-boat-rounded",
        date: "May 31 2023"
    },
    {
        title: "Test"
    }
]
</script>

<template>
    <div id="roadmap" ref="container" :style="{ backgroundPosition: `${scroll.px / 100}%` }">
        <div class="shadow"></div>
        <h1 class="hero" :text="$t('rm_hero')">{{ $t("rm_hero") }}</h1>
        <div class="line" :style="{ height: `${scroll.px + 100}px` }"></div>
        <div class="indicator" :style="{ opacity: 1 - (scroll.px / 50) }">
            <Icon name="gg:mouse"/>
            <Icon class="arrow" name="line-md:chevron-left"/>
        </div>
        <RoadmapPoint v-for="(data, index) in steps" :data="data" :index="index" :scroll="scroll.px"/>
    </div>
</template>

<style scoped lang="scss">
#roadmap {
    height: calc(100vh - 5.5rem);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    gap: 5rem;
    background-color: rgb(10,10,10);;
    background-image: radial-gradient(rgba(255,255,255,0.25) 0.6px, rgba(0,0,0,0) 0.5px);
    background-size: 20px 20px;
    padding-bottom: 240px;
    > * {
        user-select: none;
    }
}

.shadow {
    position: fixed;
    width: 100%;
    height: calc(100vh - 5.5rem);
    bottom: 0;
    left: 0;
    box-shadow: 0 0 2rem 5rem rgb(10, 10, 10) inset;
    pointer-events: none;
    scale: 1 1.02;
    z-index: 2;
}

.hero {
    font-size: 8rem;
    letter-spacing: 12px;
    text-transform: uppercase;
    font-family: "Stalker";
    margin-top: 3rem;
    position: relative;
    color: rgb(var(--color-primary-500));
    &::after {
        content: attr(text);
        top: 0;
        left: 0;
        position: absolute;
        scale: 1.05;
        z-index: 0;
        color: white;
        filter: drop-shadow(0 0 1rem rgb(var(--color-primary-500)));
    }
}

.line {
    background-color: rgb(var(--color-primary-500));
    width: 6px;
    position: absolute;
    top: 288px;
    &::after {
        position: absolute;
        content: "";
        display: flex;
        background-color: rgb(var(--color-primary-500));
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 2rem;
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}

.indicator {
    transition: all 0.1s;
    display: flex;
    gap: 1rem;
    margin-top: 10rem;
    svg {
        font-size: 3rem;
        &.arrow {
            rotate: 270deg;
        }
    }
}
</style>