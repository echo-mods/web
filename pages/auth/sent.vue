<script lang="ts" setup>
definePageMeta({
    name: "Confirmation sent",
    ru_name: "Письмо отправлено",
});
const iconStates = reactive({
	mail: false,
	check: false,
	wink: false
})

onMounted(() => {
	setTimeout(() => {
		iconStates.mail = true
		setTimeout(() => {
			iconStates.check = true
			setTimeout(() => {
				iconStates.wink = true
			}, 500);
		}, 1200);
	}, 1000);
})
</script>

<template>
    <div class="__sent">
		<div class="frame">
			<div class="icons flex gap-8">
				<Icon v-if="iconStates.mail" class="text-5xl" name="line-md:email-twotone-alt"/>
				<Icon v-else class="text-5xl opacity-0" name="line-md:email-twotone-alt"/>
				<Icon v-if="iconStates.check" class="text-5xl" name="line-md:circle-twotone-to-confirm-circle-twotone-transition"/>
				<Icon v-else class="text-5xl opacity-0" name="line-md:circle-twotone-to-confirm-circle-twotone-transition"/>
				<Icon v-if="iconStates.wink" class="text-5xl" name="line-md:emoji-smile-wink-twotone"/>
				<Icon v-else class="text-5xl opacity-0" name="line-md:emoji-smile-wink-twotone"/>
			</div>
			<h2 class="text-3xl font-bold text-center">{{ $t("conf_sent_title") }}</h2>
			<p class="w-2/3 text-center">{{ $t("conf_sent_text") }}</p>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.__sent {
    display: flex;
    flex-direction: column;
    align-items: center;
	padding: 1rem;
	.frame {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
		outline: 1px solid rgb(var(--color-primary-DEFAULT) / 0.5);
		width: 800px;
		max-width: 100%;
		border-radius: 1rem;
		padding: 1rem;
	}
}
</style>
