<script setup lang="ts">
const ipc = useState("ipc_g", () => undefined)

const router = useRouter()

onMounted(() => {
    if (!ipc.value) {
        const timeout = setTimeout(() => {
            router.push("/")
        }, 1000);
        watch(ipc, () => {
            if (!!ipc.value) clearTimeout(timeout)
        })
    }
})
</script>

<template>
    <div class="__callback flex justify-center items-center">
        <Icon class="text-3xl" name="svg-spinners:ring-resize" />
    </div>
</template>

<style scoped lang="scss">
.__callback {
    height: 100vh;
}
</style>