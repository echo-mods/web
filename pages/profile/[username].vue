<script setup lang="ts">
definePageMeta({
    name: 'User profile',
    ru_name: 'Профиль пользователя',
})
const { params: { username } } = useRoute()

const { data: user_data, error } = await useFetch(`/api/data-by-username`, {
	query: {
		username: username
	}
})
</script>

<template>
    <div id="account" class="__account">
		<pre>{{ user_data }}</pre>
		{{ error }}
    </div>
</template>

<style scoped lang="scss">
#account {
    padding: 0 0.75rem;
    width: calc(100%);
}
</style>