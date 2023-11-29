<script setup lang="ts">
const fs_state = useState<boolean>("fs_content_state", () => false);
const fs_content = useState<string[]>("fs_content_content", () => []);
const fs_index = useState<number>("fs_content_index", () => 0);
</script>

<template>
    <PrimaryHeader />
    <slot />
    <Transition name="g_slideshow">
        <ContentSlideshow
            v-if="fs_state"
            :content="fs_content"
            :startingIndex="fs_index"
            :isGlobalHandler="true"
        />
    </Transition>
</template>

<style scoped>
footer {
    height: 1rem;
    width: 100%;
    background-color: white;
}

.g_slideshow-enter-active,
.g_slideshow-leave-active {
    transition: all 0.3s;
}

.g_slideshow-enter-from,
.g_slideshow-leave-to {
    scale: 0.8;
    opacity: 0;
}
</style>
