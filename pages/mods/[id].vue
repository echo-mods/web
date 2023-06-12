<script setup lang="ts">
definePageMeta({
    name: 'Mod',
    ru_name: 'Мод',
    validate: async (route) => {
        const { api_endpoint } = useAppConfig()
        const req = await useFetch(`${api_endpoint}mods/${route.params.id}`)
        const data = await req["data"].value
        
        return data !== null && data !== undefined
    }
})
</script>

<template>
    <h1>{{ $route.params.id }}</h1>
</template>