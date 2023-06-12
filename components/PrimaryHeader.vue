<template>
    <header>
        <NuxtLink to="/">
            <img src="/favicon.ico" alt="Logo">
        </NuxtLink>
        <LangSwitcher />
    </header>
</template>

<style scoped>
header {
    height: 4rem;
    margin: 0.75rem;
    background-color: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(1px);
    border-radius: 8px;
    border: 1px rgba(255, 255, 255, 0.3) solid;
    box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.8);
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>