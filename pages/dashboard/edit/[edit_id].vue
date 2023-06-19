<script setup>
definePageMeta({
    name: 'Edit mod',
    ru_name: 'Редактировать мод',
    middleware: 'auth'
})
const route = useRoute()
const { api_endpoint } = useAppConfig()
const { data } = await useFetch(`${api_endpoint}mods/${route.params.edit_id}`)

const { locale } = useI18n()

const dataString = JSON.stringify(data.value)
const form = reactive(data.value)

const changed = computed(() => {
    return dataString !== JSON.stringify(form)
})

const fields = [
    {
        index: "name",
        label: "Name",
        description: "",
        ru_label: "Название",
        ru_description: "",
        icon: "i-heroicons-light-bulb-solid"
    },
    {
        index: "description",
        label: "Description",
        description: "",
        ru_label: "Описание",
        ru_description: "",
        icon: "i-heroicons-bars-3-bottom-left-20-solid"
    }
]
</script>
    
<template>
    <section id="edit-mod">
        <h1>{{ $t("make_changes") }}</h1>
        <UFormGroup v-for="field in fields" :label="locale === 'en' ? field.label : field.ru_label" :description="locale === 'en' ? field.description : field.ru_description">
            <UInput :icon="field.icon" v-model="form[field.index]"/>
        </UFormGroup>
        <UButton color="white" :disabled="!changed">{{ $t("save_changes") }}</UButton>
    </section>
</template>

<style scoped lang="scss">
#edit-mod {
    padding: 0.75rem;
    background-color: rgba(255,255,255, 0.01);
    backdrop-filter: blur(1px);
    margin: 1rem 2rem;
    border: 1px rgba(255, 255, 255, 0.3) solid;
    border-radius: 8px;
    > * {
        margin: 0.75rem 0;
    }
    h1 {
        font-size: 2rem;
    }
}
</style>