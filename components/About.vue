<script lang="ts" setup>
const { locale } = useI18n();

const content = computed(() => {
    return locale.value === "en"
        ? {
              title: "About us",
              description: [
                  "The project aims to create an independent modding platform for S.T.A.L.K.E.R., uniting the modding community.",
                  "It seeks to provide a high-quality hub for all aspects of S.T.A.L.K.E.R. modding, including a website and PC application.",
                  "The primary goal is to advance S.T.A.L.K.E.R. modding independently from GSC Game World.",
              ],
          }
        : {
              title: "О проекте",
              description: [
                  "Цель проекта - создать независимую платформу для моддинга S.T.A.L.K.E.R., объединяя сообщество моддинга.",
                  "Проект предлагает высококачественный хаб для всех аспектов моддинга S.T.A.L.K.E.R., включая веб-сайт и приложение для ПК.",
                  "Основная задача - развивать моддинг S.T.A.L.K.E.R. независимо от GSC Game World.",
              ],
          };
});
</script>

<template>
    <div class="__about">
        <h1 class="font-bold text-3xl">{{ content.title }}</h1>
        <ul>
			<template v-for="(line, index) in content.description">
            	<hr v-if="index > 0" style="opacity: 0.4; margin: 0 1rem;">
				<li>{{ line }}</li>
			</template>
        </ul>
		<p class="text-lg" v-if="locale === 'en'">
			See the <NuxtLink to="/roadmap">roadmap</NuxtLink> for more info.
		</p>
		<p class="text-lg" v-else>
			Подробнее на странице <NuxtLink to="/roadmap">планы</NuxtLink>.
		</p>
    </div>
</template>

<style lang="scss" scoped>
.__about {
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    ul {
        list-style-type: disc;
		opacity: 0.8;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
        li {
            margin-left: 2rem;
        }
    }
	a {
		color: rgb(var(--color-primary-DEFAULT));
	}
}
</style>
