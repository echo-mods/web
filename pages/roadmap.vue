<script setup lang="ts">
definePageMeta({
    name: "Roadmap",
    ru_name: "Планы",
    horizonal_id: 3,
});

const { locale } = useI18n();

const container = ref();
const scroll = reactive({
    percentage: 0,
    px: 0,
});

const updateScrollPos = () => {
    scroll.px = container.value.scrollTop;
    scroll.percentage = Math.round(
        (container.value.scrollTop /
            (container.value.scrollHeight - container.value.offsetHeight)) *
            100
    );
};

onMounted(() => {
    container.value.addEventListener("scroll", updateScrollPos);
});

onBeforeUnmount(() => {
    if (container.value) {
        container.value.removeEventListener("scroll", updateScrollPos);
    }
});

interface step {
    icon?: string;
    title: string;
    date?: string;
}

const steps = computed<step[]>(() => {
    return locale.value === "en"
        ? [
              // English
              {
                  title: "Demo release",
				  description: "Demo website and desktop application (Proof of concept)",
                  icon: "clarity:application-solid",
                  date: "Q4 2023",
				  compete: true
              },
              {
                  title: "Preview release",
				  description: "Base functionality like publishing mods, commenting, etc.",
                  icon: "mdi:beta",
                  date: "Q2 2024",
              },
              {
                  title: "1.0 release",
				  description: "Advanced functionality - To be determined by user feedback",
                  icon: "noto-v1:fireworks",
                  date: "~Q4 2024",
              },
          ]
        : [
              // Russian
              {
                  title: "Демонстрация",
				  description: "Демонастрация сайта и программы на ПК",
                  icon: "clarity:application-solid",
                  date: "IV кв. 2023",
				  compete: true
              },
              {
                  title: "Предварительный релиз",
				  description: "Базовый функционал, такой как публикация модов, оставление комментариев и т.п.",
                  icon: "mdi:beta",
                  date: "II кв. 2024",
              },
              {
                  title: "Релиз 1.0",
				  description: "Сложная функционал - будет определён запросами пользователей",
                  icon: "noto-v1:fireworks",
                  date: "~IV кв. 2024",
              },
          ];
});

const finalCard = computed(() => {
    return {
        title: locale.value === "en" ? "Next Chapter" : "Следующая Глава",
        detail:
            locale.value === "en"
                ? "Stay tuned for exciting developments as we continue our journey."
                : "Ожидайте крупных событий по мере продолжения нашего пути.",
    };
});
</script>

<template>
    <div
        id="roadmap"
        class="__roadmap"
        ref="container"
        :style="{ backgroundPosition: `${scroll.px / 100}%` }"
    >
        <h1 class="hero" :text="$t('rm_hero')">{{ $t("rm_hero") }}</h1>
        <div class="line" :style="{ height: `${scroll.px + 100}px` }"></div>
        <div class="indicator" :style="{ opacity: 1 - scroll.px / 50 }">
            <Icon class="mouse" name="gg:mouse" />
            <Icon class="touch" name="material-symbols:touch-app-outline" />
            <Icon class="arrow" name="line-md:chevron-left" />
        </div>
        <RoadmapPoint
            v-for="(data, index) in steps"
            :data="data"
            :index="index"
            :scroll="scroll.px"
        />
		<div></div>
        <div
            class="end flex flex-col items-center justify-center"
            :class="{ enabled: scroll.percentage >= 95 }"
        >
            <h1 class="opacity-95 text-xl text-center">
                {{ finalCard.title }}
            </h1>
            <p class="opacity-40 text-center">{{ finalCard.detail }}</p>
        </div>
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
    padding-bottom: 50vh;
    pointer-events: scroll;

    > * {
        user-select: none;
    }

    &::-webkit-scrollbar {
        display: none;
    }
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
        filter: drop-shadow(0 0 5rem rgb(var(--color-primary-500)));
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

.end {
    --cont-width: 20rem;
    --cont-height: 10rem;
    position: fixed;
    top: 475px;
    //
    border-radius: 1rem;
    padding: 1rem;
    border: 0.2rem solid rgb(var(--color-primary-500));
    overflow: hidden;
    //
    translate: -0.4px -0.1rem;
    width: var(--cont-width);
    height: var(--cont-height);
    padding: 2rem;
    transition: all 0.5s ease-in-out;
    display: flex;
    opacity: 0.8;
    flex-direction: column;

    h1,
    p {
        transition: all 1s ease-in-out 1s;
    }
    box-shadow: 0 0 2rem rgb(var(--color-primary-500)) inset;
    &:not(.enabled) {
        width: 0;
        height: 0;
        padding: 0;
        opacity: 1;
        transition: all 0.25s ease-in-out;
        h1,
        p {
            opacity: 0;
            transition: all 0.1s ease-in-out;
        }
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
        left: 12vw;
    }

    .end {
        top: unset;
        bottom: 2rem;
        &:not(.enabled) {
            opacity: 0;
        }
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
}
</style>
