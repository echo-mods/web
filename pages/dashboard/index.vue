<script setup lang="ts">
definePageMeta({
    name: 'Dashboard',
    ru_name: 'Личный Кабинет',
    middleware: 'auth'
})
const { api_endpoint } = useAppConfig()
const SessionCookie = useCookie("SESSION_KEY")

const uploadMod = () => {
    const element = document.getElementById("file_upload")
    if (element) {element.click()}
}

const { data } = await useFetch(`${api_endpoint}dashboard`, {
    query: {
        session: SessionCookie.value
    }
})

//const { mods } = data.value
const mods: any = []
</script>

<template>
    <section id="dashboard">
        <h5 class="section-heading">{{ $t("lk_actions") }}</h5>
        <div class="actions">
            <UTooltip :text="$t('mod_upload_info')">
                <UButton color="white" @click="uploadMod"><Icon name="solar:upload-minimalistic-linear"/>{{ $t("upload_mod") }}</UButton>
            </UTooltip>
        </div>
        <hr>
        <h5 class="section-heading">{{ $t("lk_mods") }}</h5>
        <div class="mods">
            <h2 v-if="mods && mods.length === 0" class="empty">{{ $t("nomods") }}</h2>
            <div class="mod" v-for="mod in mods">
                <h1>{{ mod.name }}</h1>
                <NuxtLink :to="`/dashboard/edit/${mod.id}`" class="edit">
                    <UButton color="white">{{ $t("edit") }}</UButton>
                </NuxtLink>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
#dashboard {
    padding: 0 0.75rem;
    width: calc(100%);
    .section-heading {
        margin: 1rem;
        font-size: 2rem;
        font-weight: 100;
    }
    hr {
        margin: 1rem 0;
        opacity: 0.3;
    }
    .mods {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: auto;
        height: calc(100vh - 18.5rem);
        gap: 1rem;
        .empty {
            font-weight: 200;
            font-size: 2rem;
            opacity: 0.5;
        }
        .mod {
            display: flex;
            align-items: center;
            width: 100%;
            background-color: rgba(255,255,255,0.05);
            border: 1px rgba(255, 255, 255, 0.3) solid;
            padding: 0.5rem;
            border-radius: 6px;
            gap: 1rem;
            cursor: pointer;
            h1 {
                font-size: 1.5rem;
                font-weight: 500;
            }
            .edit {
                margin-left: auto;
            }
        }
    }
}
</style>