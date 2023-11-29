<script setup lang="ts">
definePageMeta({
    name: 'My account',
    ru_name: 'Личный Кабинет',
    middleware: 'auth'
})
</script>

<template>
    <div id="account" class="__account">
		<h1>test</h1>
    </div>
</template>

<style scoped lang="scss">
#account {
    padding: 0 0.75rem;
    width: calc(100%);
}
</style>