<script setup lang="ts">
const props = defineProps(["error"])
const router = useRouter()

const handleError = () => clearError({ redirect: '/' })

</script>

<template>
    <main>
        <h1>{{ error.statusCode }}</h1>
        <p v-if="error.statusCode === 404">{{ $t("err_nf") }}</p>
        <p v-else>{{ error.statusMessage }}</p>
        <NuxtLink>
            <button @click="handleError">
                <div>{{ $t("err_button") }}</div>
            </button>
        </NuxtLink>
    </main>
</template>

<style lang="scss">
main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    h1 {
        font-size: 6rem;
        font-weight: 800;
    }
    p {
        margin-bottom: 2rem;
        font-weight: 200;
    }
    button {
        font-weight: 100;
        transition: all 0.3s;
        border-radius: 8px;
        padding: 1px;
        div {
            padding: 0.5rem 1.5rem;
            background-color: rgb(10,10,10);
            border-radius: 8px;
            transition: all 0.3s;
        }
        background: linear-gradient(55deg, #ff7300 0%, rgb(0, 0, 0) 100%);
    }
    button:hover {
        div {
            background-color: rgb(10,10,10);
            padding: 0.5rem 2.5rem;
        }
    }
}
</style>