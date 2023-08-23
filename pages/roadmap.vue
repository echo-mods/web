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

const updateScrollPos = () => {
    scroll.px = container.value.scrollTop
    scroll.percentage = Math.round(container.value.scrollTop / (container.value.scrollHeight - container.value.offsetHeight) * 100)
}

onMounted(() => {
    container.value.addEventListener("scroll", updateScrollPos)
})

onBeforeUnmount(() => {
    if (container.value) {
        container.value.removeEventListener("scroll", updateScrollPos)
    }
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
            <Icon class="mouse" name="gg:mouse" />
            <Icon class="touch" name="material-symbols:touch-app-outline" />
            <Icon class="arrow" name="line-md:chevron-left" />
        </div>
        <RoadmapPoint v-for="(data, index) in steps" :data="data" :index="index" :scroll="scroll.px" />
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
    background-color: rgb(10, 10, 10);
    ;
    background-image: radial-gradient(rgba(255, 255, 255, 0.25) 0.6px, rgba(0, 0, 0, 0) 0.5px);
    background-size: 20px 20px;
    padding-bottom: 50vh;

    >* {
        user-select: none;
    }

    &::-webkit-scrollbar {
        display: none;
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
    font-family: "Stalker", sans-serif;
    margin-top: 3rem;
    position: relative;
    color: rgb(var(--color-primary-500));
    transition: all 0.3s;

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

    &:hover {
        perspective: 200px;
        transform: scale(1.1);
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

@keyframes arrow {
    0% {
        translate: 0 -0.2rem;
    }

    50% {
        translate: 0 0.2rem;
    }

    100% {
        translate: 0 -0.2rem;
    }
}

.indicator {
    transition: all 0.1s;
    display: flex;
    gap: 1rem;
    margin-top: 10rem;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 2px rgba(255, 255, 255, 0.3) solid;
    backdrop-filter: blur(1px);

    svg {
        font-size: 2rem;

        &.touch {
            display: none;
        }

        &.arrow {
            rotate: 270deg;
            animation: arrow 1s infinite;
        }
    }
}

@media only screen and (max-width: 600px) {
    #roadmap {
        gap: 10rem;
    }
    .line {
        transition: all 0.1s;
        left: 20vw;
    }
    
    .shadow {
        box-shadow: 0 0 1rem 2rem rgb(10, 10, 10) inset;
    }
    .indicator {
        svg.mouse {
            display: none;
        }

        svg.touch {
            display: block !important;
        }
        svg.arrow {
            rotate: 90deg;
        }
    }
}</style>