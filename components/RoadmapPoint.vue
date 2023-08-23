<script setup lang="ts">
defineProps(["data", "scroll", "index"])

const yPos = ref(1000)
const yHeight = ref(0)
const container = ref()

onMounted(() => {
    yPos.value = container.value.offsetTop
    yHeight.value = container.value.offsetHeight
})
</script>

<template>
    <div class="container" ref="container" :style="{ opacity: 1 - (yPos + yHeight / 2 - scroll - 380) / 50 }">
        <div class="dot">
            <div class="connector" :style="{ translate: index % 2 === 0 ? `` : `-100%` }"></div>
        </div>
        <div class="info" :style="{ translate: index % 2 === 0 ? `calc(4rem + 50%)` : `calc(-4rem - 50%)` }">
            <Icon v-if="data.icon" :name="data.icon"/>
            <div class="text">
                <h1>{{ data.title }}</h1>
                <h2>{{ data.date }}</h2>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    opacity: 0;
    display: flex;
    position: relative;
    justify-content: center;
    .dot {
        position: absolute;
        background-color: rgb(var(--color-primary-500));
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 2rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .connector {
            display: flex;
            content: "";
            position: absolute;
            background-color: rgb(var(--color-primary-500));
            width: 4rem;
            height: 1px;
            top: 50%;
            left: 50%;
        }
    }

    .info {
        display: flex;
        align-items: center;
        gap: 1rem;
        background-color: rgba(255, 255, 255, 0.1);
        width: auto;
        padding: 1rem;
        border-radius: 0.5rem;
        border: 2px solid rgba(255, 255, 255, 0.3);
        > svg {
            font-size: 2rem;
        }
        .text {
            display: flex;
            flex-direction: column;
            h1 {
                font-weight: 500;
                font-size: 1.5rem;
                color: rgb(var(--color-primary-500));
            }
            h2 {
                font-weight: 100;
                font-size: 0.75rem;
            }
        }
    }
}

@media only screen and (max-width: 600px) {
    .dot {
        left: calc(20vw + 0.2rem) !important;
    }
    .connector {
        translate: 0 0 !important;
    }
    .info {
        position: absolute;
        left: 20vw;
        translate: 4rem -50% !important;
    }
}
</style>