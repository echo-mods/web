<script setup lang="ts">
import type { Mod, ModBuild } from "~/types/database";
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

definePageMeta({
    name: "Explore",
    ru_name: "Моды",
    horizonal_id: 4,
});

const supabase = useSupabaseClient();

const { locale } = useI18n();

const pending = ref(true);
const { data: card_array } = await supabase.from("mods").select("*");
const cards = ref(card_array as Mod[]);
pending.value = false;

const handle_postgres_changes = (
    payload: RealtimePostgresChangesPayload<{ [key: string]: any }>
) => {
    const mod = payload.eventType !== "DELETE" ? (payload.new as Mod) : (payload.old as Mod);
    switch (payload.eventType) {
        case "INSERT":
			cards.value.push(mod)
            break;
        case "UPDATE":
            cards.value.forEach(
                (mod_checking: Mod, index: number) => {
                    if (mod_checking.mod_id === mod.mod_id) {
						cards.value[index] = mod
                    }
                }
            );
            break;
        case "DELETE":
            cards.value.forEach(
                (mod_checking: Mod, index: number) => {
                    if (mod_checking.mod_id === mod.mod_id) {
						cards.value.splice(index, 1)
                    }
                }
            );
            break;
    }
};

const listener = supabase
    .channel("custom-all-channel")
    .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "mods" },
        handle_postgres_changes
    )
    .subscribe();
</script>

<template>
	<div class="__explore">
		<section id="explore">
			<!-- Page containing mods -->
			<div v-if="pending" class="placeholder-container">
				<div class="card-placeholder">
					<USkeleton class="w-[100%] h-4" />
					<USkeleton class="w-[30%] h-5" />
					<USkeleton class="w-[50%] h-7" />
				</div>
				<div class="card-placeholder">
					<USkeleton class="w-[100%] h-4" />
					<USkeleton class="w-[30%] h-5" />
					<USkeleton class="w-[50%] h-7" />
				</div>
				<div class="card-placeholder">
					<USkeleton class="w-[100%] h-4" />
					<USkeleton class="w-[30%] h-5" />
					<USkeleton class="w-[50%] h-7" />
				</div>
			</div>
			<NuxtLink
				v-if="!pending"
				class="card"
				tag="div"
				v-for="(data, index) in cards"
				:to="`/mods/${data.mod_id}`"
			>
				<img v-once :src="data.thumbnail_url" class="background" />
				<div class="info-container">
					<span v-once>
						<Icon
							name="streamline:interface-favorite-star-reward-rating-rate-social-star-media-favorite-like-stars"
						/>
						{{ 5 }} / 10
					</span>
					<UPopover mode="hover" :popper="{ strategy: 'absolute' }">
						<h2>{{ data.description }}</h2>
						<template #panel>
							<p v-once style="margin: 1rem; text-align: center">
								{{ data.description }}
							</p>
						</template>
					</UPopover>
				</div>
				<h1>{{ data.name }}</h1>
			</NuxtLink>
			<ClientOnly>
				<div class="done">
					<img v-if="locale === 'ru'" src="/done.png" />
					<h1>{{ $t("done") }}</h1>
				</div>
			</ClientOnly>
		</section>
	</div>
</template>

<style scoped lang="scss">
#explore {
    margin: 0.75rem;
    width: calc(100% - 1.5rem);
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    z-index: -5;
}

.placeholder-container {
    width: calc(100% - 1.5rem);
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.card-placeholder {
    width: calc((100% - 2rem) / 3);
    border: 1px rgba(255, 255, 255, 0.15) solid;
    backdrop-filter: blur(1px);
    aspect-ratio: 1.6;
    border-radius: 8px;
    display: flex;
    flex-direction: column-reverse;
    padding: 1.2rem;
    gap: 5px;
}

.card {
    border: 1px rgba(255, 255, 255, 0.3) solid;
    width: calc((100% - 2rem) / 3);
    aspect-ratio: 1.6;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    box-shadow: none;
    transition: all 0.3s ease-in-out;
    display: flex;
    flex-direction: column-reverse;
    padding: 1.2rem;

    .background {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: -1;
        object-fit: cover;
        object-position: center;
    }

    h1 {
        font-size: 1.5rem;
    }

    .info-container {
        height: 0;
        opacity: 0;
    }

    h2 {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    * {
        transition: all 0.3s ease-in-out;
    }
}

.card:hover {
    box-shadow: 0 -6rem 5rem rgba(0, 0, 0, 0.8) inset;

    .info-container {
        height: 3rem;
        opacity: 1;
    }
}

.done {
    user-select: none;
    width: 100%;
    text-align: center;
    margin: 1.5rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        font-size: 2rem;
        font-weight: 100;
    }

    img {
        width: 15rem;
    }
}

.fade-move,
/* apply transition to moving elements */
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    filter: blur(0.4rem);
}

.fade-leave-active {
    position: absolute;
}

@media (max-width: 600px) {
    .card,
    .card-placeholder {
        width: calc(100%);
        aspect-ratio: 1.2;
    }
}
</style>
