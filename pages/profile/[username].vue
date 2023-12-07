<script setup lang="ts">
definePageMeta({
    name: "User profile",
    ru_name: "Профиль пользователя",
});
const {
    params: { username },
} = useRoute();

const { data, error } = await useFetch(`/api/data-by-username`, {
    query: {
        username: username,
    },
});

const user = data.value as any;
</script>

<template>
    <div id="account" class="__account">
        <div class="user">
            <div class="main">
                <img
                    class="pfp"
                    v-if="user.user_metadata.avatar_url"
                    :src="user.user_metadata.avatar_url"
                />
                <div class="data">
                    <h2 class="name" v-if="user.user_metadata.full_name">
                        {{ user.user_metadata.full_name }}
                    </h2>
                    <h3 class="username">{{ useUsername(user) }}</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
#account {
    display: flex;
    flex-direction: column;
    align-items: center;
    .user {
        --displacement: 1.5rem;
        translate: 0 calc(var(--displacement) * -1);
        background-color: rgba(255, 255, 255, 0.1);
        border: 1px solid rgb(var(--color-primary-DEFAULT));
        border-top: none;
        border-radius: 0 0 1rem 1rem;
        padding: 1.5rem;
        .main {
            display: flex;
            align-items: center;
            gap: 2rem;
            margin-top: var(--displacement);
            .pfp {
                border-radius: 5rem;
                width: 6rem;
                aspect-ratio: 1;
            }
            .data {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                h2 {
                    font-size: 1.5rem;
                    font-weight: 600;
                }
                h3 {
                    font-size: 1.2rem;
                    font-weight: 400;
                }
                > * {
                    margin: 0;
                }
            }
        }
    }
}
</style>
