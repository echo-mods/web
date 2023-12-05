<script setup lang="ts">

const fs_state = useState<boolean>("fs_content_state", () => false);
const fs_content = useState<string[]>("fs_content_content", () => []);
const fs_index = useState<number>("fs_content_index", () => 0);

const ipc = useState<any>("ipc_g", () => null)
const inElectron = computed(() => !!ipc.value)

const closeElectron = () => {
    window.close()
}
const route = useRoute()

const electron_assumption = !!route.query["electron"]
</script>

<template>
    <PrimaryHeader v-if="!inElectron && ipc !== null || !electron_assumption"/>
    <div id="electron-topbar" v-else-if="ipc !== null">
        <div class="draggable"></div>
        <UButton @click="closeElectron" variant="link" icon="i-heroicons-x-mark-solid"/>
    </div>
    <slot v-if="!inElectron || route.path.startsWith('/auth')"/>
    <Transition name="g_slideshow">
        <ContentSlideshow
            v-if="fs_state"
            :content="fs_content"
            :startingIndex="fs_index"
            :isGlobalHandler="true"
        />
    </Transition>
</template>

<style lang="scss" scoped>
footer {
    height: 1rem;
    width: 100%;
    background-color: white;
}

#electron-topbar {
    display: flex;
    align-items: center;
    height: 3rem;
    border-bottom: 1px solid rgb(var(--color-primary-DEFAULT));
    padding: 0 1rem;
    .draggable {
        width: 100%;
        height: 100%;
        -webkit-app-region: drag;
    }
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
